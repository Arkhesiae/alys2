import {
    airDensity,
    airPressure,
    CAStoTAS, drag, ESF, HpTrans,
    knotToMs,
    lowSpeedBuffetting, MachtoTAS, maxClimbTOThrust, minimumSpeed, ROCD,
    TAStoCAS,
    TAStoMach,
    temperature
} from "@/BADA/func.js"
import {Constante} from "@/BADA/constantes.js"

export class PhysicalPlane {
    flightCoefficients = {
        acTypeData: {
            engineType: "JET",
            numberOfEngines: "2",
            wakeTurbulenceCategory: "MEDIUM"
        },
        aerodynamics: {
            buffetCoefficient: "1.2273",
            buffetGradient: "0.47037",
            inducedDragApproach: "0.035779",
            inducedDragCruise: "0.025882",
            inducedDragLanding: "0.036689",
            machDragCoefficient: "0.0",
            parasiticDragApproach: "0.046986",
            parasiticDragCruise: "0.025954",
            parasiticDragLanding: "0.097256",
            parasiticDragLandingGear: "0.02568",
            stallSpeedApproaching: "1000",
            stallSpeedCruise: "1390",
            stallSpeedInitialClimbing: "1130",
            stallSpeedLanding: "940",
            stallSpeedTakeoff: "1040",
            wingSurfaceArea: "122.6"
        },
        aircraftStandardMass: {
            maximumMass: "70000",
            maximumPayloadMass: "17000",
            minimumMass: "40000",
            referenceMass: "60000"
        },
        aircraftEngineThrust: {
            firstMaxClimbThrust: "140720.0",
            thirdMaxClimbThrust: "9.6625E-11",
            approachThrust: "0.14767",
            descentMach: "0.78",
            descentSpeed: "3000",
            firstThrustTemperatureCoefficient: "9",
            highAltitudeDescentThrust: "0.083084",
            landingThrust: "0.34217",
            lowAltitudeDescentThrust: "0.051765",
            secondMaxClimbThrust: "47489.0",
            secondThrustTemperatureCoefficient: "0.0094754",
            transitionAltitude: "27726.0"
        },
        aircraftFlightEnvelope: {
            altitudeTemperatureGradient: "-160",
            maxAltitudeAtMTOW: "37575",
            maxOperatingAltitude: "41000",
            maxOperatingMachNumber: "0.82",
            maxOperatingSpeed: "3500",
            weightGradient: "0.31247"
        },
        groundPerformance: {
            landingLength: "1470.0",
            length: "33.84",
            takeoffLength: "1820.0",
            wingSpan: "34.1"
        },
        aircraftFuelConsumption: {
            firstThrustConsumption: {
                JET: {
                    jetConsumption: "0.72891"
                }
            },
            cruiseConsumption: "0.99224",
            firstDescentConsumption: "11.114",
            secondDescentConsumption: "133850.0",
            secondThrustConsumption: "1729.8"
        },
        aircraftType: "A319"
    }

    dVTAS = 0

    flightParams = {
        speed: {
            CAS: "",
            TAS: "",
            Mach: "",
        },

        Hp: "",
        ROCD: "",
        mass: ""
    }

    force = {
        drag: "",
        thrust: "",
    }

    configuration = "CLEAN"

    atmosphereParams = {
        pressure: "",
        deltaT: "",
        temperature: "",
        airDensity: "",
    }

    loiMontee = {
        CAS: "",
        Mach: "",
        HpTrans: "",
    }

    loiDescente = {
        CAS: "",
        Mach: "",
        HpTrans: "",
    }

    maxThrust = 0

    constructor() {
    }

    setParameters(mass) {
        this.flightParams.mass = mass
    }

    setLoiMontee(CAS, M) {
        this.loiMontee.CAS = CAS
        this.loiMontee.Mach = M
        this.loiMontee.HpTrans = HpTrans(knotToMs(CAS), M)
        this.setLoiDescente(CAS, M)
    }

    setLoiDescente(CAS, M) {
        this.loiDescente.CAS = CAS
        this.loiDescente.Mach = M
        this.loiDescente.HpTrans = HpTrans(knotToMs(CAS), M)
    }


    setInitialState(altitude, speed, ROCD, deltaT) {
        this.idleState = true
        this.distanceFromStartPoint = 0
        this.flightParams.Hp = altitude
        this.flightParams.speed.CAS = speed
        this.atmosphereParams.deltaT = deltaT
        this.dVTAS = 0
        this.setAtmosphere()
        this.flightParams.speed.TAS = CAStoTAS(this.flightParams.speed.CAS, this.atmosphereParams.pressure, this.atmosphereParams.temperature)
        this.flightParams.ROCD = ROCD
        if (ROCD === 0) {
            this.force.thrust = 0
        }

        this.computeSpeed()

        this.computeAerodynamics()

    }

    setAtmosphere() {
        this.atmosphereParams.temperature = temperature(this.atmosphereParams.deltaT, this.flightParams.Hp)
        this.atmosphereParams.pressure = airPressure(this.atmosphereParams.deltaT, this.flightParams.Hp)
        this.atmosphereParams.airDensity = airDensity(this.atmosphereParams.pressure, this.atmosphereParams.temperature)

    }

    computeSpeed() {
        this.computeMinSpeed()
        this.computeMaxSpeed()
        this.flightParams.speed.CAS = TAStoCAS(this.flightParams.speed.TAS, this.atmosphereParams.pressure, this.atmosphereParams.temperature)
        this.flightParams.speed.Mach = TAStoMach(this.flightParams.speed.TAS, this.atmosphereParams.temperature)
        // console.log("TAS", msToKnot(CAStoTAS(this.flightParams.speed.CAS, this.atmosphereParams.pressure, this.atmosphereParams.temperature)))
        // this.lowSpeedBuffetingLimit = lowSpeedBuffetting(parseFloat( this.flightCoefficients.aerodynamics.buffetGradient), parseFloat( this.flightCoefficients.aerodynamics.buffetCoefficient),  this.atmosphereParams.pressure, parseFloat( this.flightCoefficients.aerodynamics.wingSurfaceArea), this.flightParams.mass*Constante.g0)
        // this.maxMach = 0.82
        // console.log(CAStoTAS(55, this.atmosphereParams.pressure, this.atmosphereParams.temperature))
    }

    loiChelou(speed) {
        this.setLoiMontee(speed, TAStoMach(CAStoTAS(knotToMs(speed), this.atmosphereParams.pressure, this.atmosphereParams.temperature), this.atmosphereParams.temperature))
        // console.log(this.loiMontee.HpTrans)
    }

    computeMinSpeed() {
        // Buffeting a 1.2g
        this.lowSpeedBuffetingLimit = lowSpeedBuffetting(parseFloat(this.flightCoefficients.aerodynamics.buffetGradient), parseFloat(this.flightCoefficients.aerodynamics.buffetCoefficient), this.atmosphereParams.pressure, parseFloat(this.flightCoefficients.aerodynamics.wingSurfaceArea), this.flightParams.mass * Constante.g0)
        this.Vstall = parseFloat(this.flightCoefficients.aerodynamics.stallSpeedCruise) / 10
        // VminStall prend un facteur 1.3 ou 1.2 selon la conf
        this.VminStall = minimumSpeed(this.Vstall, "")
        if (this.flightParams.Hp * 3.28084 > 15000) {
            this.minSpeed = Math.max(knotToMs(this.VminStall), TAStoCAS(MachtoTAS(this.lowSpeedBuffetingLimit, this.atmosphereParams.temperature), this.atmosphereParams.pressure, this.atmosphereParams.temperature))
        } else this.minSpeed = knotToMs(this.VminStall)
    }

    computeMaxSpeed() {
        this.maxSpeed = Math.min(knotToMs(parseFloat(this.flightCoefficients.aircraftFlightEnvelope.maxOperatingSpeed) / 10), TAStoCAS(MachtoTAS(parseFloat(this.flightCoefficients.aircraftFlightEnvelope.maxOperatingMachNumber), this.atmosphereParams.temperature), this.atmosphereParams.pressure, this.atmosphereParams.temperature))
    }

    computeAerodynamics() {
        this.force.drag = drag(this.atmosphereParams.airDensity, this.flightParams.speed.TAS, parseFloat(this.flightCoefficients.aerodynamics.wingSurfaceArea), 0, parseFloat(this.flightCoefficients.aerodynamics.parasiticDragCruise), parseFloat(this.flightCoefficients.aerodynamics.inducedDragCruise), this.flightParams.mass)
    }

    computeThrust() {
        this.computeMaxClimbThrust()
        this.computeMaxCruiseThrust()
        this.force.thrust = this.maxThrust
    }

    computeMaxClimbThrust() {
        let Ctc1 = parseFloat(this.flightCoefficients.aircraftEngineThrust.firstMaxClimbThrust)
        let Ctc2 = parseFloat(this.flightCoefficients.aircraftEngineThrust.secondMaxClimbThrust)
        let Ctc3 = parseFloat(this.flightCoefficients.aircraftEngineThrust.thirdMaxClimbThrust)
        this.maxThrust = parseFloat(maxClimbTOThrust(Ctc1, Ctc2, Ctc3, this.flightParams.Hp))
        // let Ctc4 = parseFloat(this.flightCoefficients.aircraftEngineThrust.firstThrustTemperatureCoefficient)
        // let Ctc5 = parseFloat(this.flightCoefficients.aircraftEngineThrust.secondThrustTemperatureCoefficient)
        // console.log(this.maxThrust)
        // this.maxThrust = correctMaxClimbTOThrust(Ctc1, Ctc2, Ctc3, Ctc4, Ctc5, this.flightParams.Hp,0)
        // console.log(this.maxThrust)
        return this.maxThrust
    }

    computeDescentThrust() {
        let selectedCoefficient
        if (this.flightParams.Hp > this.loiDescente.HpTrans) {
            selectedCoefficient = parseFloat(this.flightCoefficients.aircraftEngineThrust.highAltitudeDescentThrust)
        } else {
            switch (this.configuration) {
                case "CLEAN" :
                    selectedCoefficient = parseFloat(this.flightCoefficients.aircraftEngineThrust.lowAltitudeDescentThrust)
                    break
                case "APPROACH" :
                    selectedCoefficient = parseFloat(this.flightCoefficients.aircraftEngineThrust.approachThrust)
                    break
                case "LANDING" :
                    selectedCoefficient = parseFloat(this.flightCoefficients.aircraftEngineThrust.landingThrust)
                    break
            }
        }
        return this.minimumDescentThrust = this.computeMaxClimbThrust() * selectedCoefficient
    }

    computeMaxCruiseThrust() {
        return this.maxThrustCruise = 0.95 * this.maxThrust
    }

    climbAtSpeed(ESFValue) {
        this.computeROCD(ESFValue)
        this.computedVTAS(ESFValue)
        this.updateFlightParams()
    }

    computeROCD(ESFValue) {
        this.flightParams.ROCD = ROCD(this.atmosphereParams.temperature, this.force.thrust, this.force.drag, this.flightParams.speed.TAS, ESFValue, this.flightParams.mass, 0)
    }

    computedVTAS(ESFValue) {
        this.dVTAS = (1 / ESFValue - 1) * Constante.g0 / this.flightParams.speed.TAS * this.flightParams.ROCD * (this.atmosphereParams.temperature / (this.atmosphereParams.temperature - this.atmosphereParams.deltaT))
    }

    palier() {
        this.computeThrustForPallier(this.flightParams.speed.TAS)
        this.setAtmosphere()
        this.computeSpeed()
        this.computeAerodynamics()
        let ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, this.atmosphereParams.deltaT, this.flightParams.Hp, "constant", 0)
        this.flightParams.ROCD = ROCD(this.atmosphereParams.temperature, this.force.thrust, this.force.drag, this.flightParams.speed.TAS, ESFValue, this.flightParams.mass, this.atmosphereParams.deltaT)
        let dVTAS = (this.force.thrust - this.force.drag) / this.flightParams.mass
        this.flightParams.speed.TAS += dVTAS
        this.updateFlightParams()
    }

    flyLoop() {
        this.updateConditions()
        switch (this.flightPhase) {
            case "LEVELLED":
                this.level()
                break
            case "CLIMB":
                this.climb()
                break
            case "DESCENT":
                this.descent()
                break
        }
        if (this.targetTime){
            this.targetTime--
        }
    }

    levelInstruction(time){
        this.idleState = false
        this.flightPhase = 'LEVELLED'
        this.setTarget('', time, '', '')
    }

    level() {
        let reachTarget
        if (this.targetTime) {
            reachTarget = (this.targetTime === 0)
            if (reachTarget) this.targetTime = null
        }
        if (!reachTarget){
            this.computeThrustForPallier(this.flightParams.speed.TAS)
            let ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, this.atmosphereParams.deltaT, this.flightParams.Hp, "CONSTANT", 0)
            this.flightParams.ROCD = ROCD(this.atmosphereParams.temperature, this.force.thrust, this.force.drag, this.flightParams.speed.TAS, ESFValue, this.flightParams.mass, this.atmosphereParams.deltaT)
            this.dVTAS = (this.force.thrust - this.force.drag) / this.flightParams.mass
            console.log("hi")
            this.updateFlightParams()
        } else this.idleState = true

    }

    climbInstruction(target, time, ROCD, speedInstruction) {
        this.idleState = false
        this.flightPhase = 'CLIMB'
        this.speedInstruction = this.computeSpeedInstruction(speedInstruction)
        console.log(this.speedInstruction)
        this.setTarget(target, time, ROCD, speedInstruction)
    }

    descentInstruction(target, time, ROCD, speedInstruction) {
        this.idleState = false
        this.flightPhase = 'DESCENT'
        this.speedInstruction = this.computeSpeedInstruction(speedInstruction)
        this.setTarget(target, time, ROCD, speedInstruction)
    }

    setTarget(target, time, ROCD, speedInstruction) {
        this.targetROCD = ROCD
        if (target) {
            this.targetFL = target
        }
        if (time) {
            this.targetTime = time
        }
        if (speedInstruction){
            this.speedInstructionValue = speedInstruction
        }
    }

    climb() {

        let reachTarget
        if (this.targetFL) {
            reachTarget = (this.flightParams.Hp >= this.targetFL*100/3.28084)
            if (reachTarget) this.targetFL= null
        }
        if (this.targetTime) {
            reachTarget = (this.targetTime === 0)
            if (reachTarget) this.targetTime = null
        }
        if (this.speedInstructionValue) {
            console.log('checkSpeed')
            reachTarget = (Math.abs(this.flightParams.speed.CAS - knotToMs(this.speedInstructionValue))<1)
            if (reachTarget) this.speedInstructionValue = null
        }
        if (!reachTarget) {
            if (this.targetROCD) {
                this.climbAtROCD(this.targetROCD / 197)
            } else {
                let ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, this.atmosphereParams.deltaT, this.flightParams.Hp, this.speedInstruction, 1)
                this.force.thrust = this.maxThrust
                this.computeROCD(ESFValue)
                this.computedVTAS(ESFValue)
                this.updateFlightParams()
            }
        } else this.idleState = true
    }

    descent() {
        let reachTarget
        if (this.targetFL) {
            reachTarget = (this.flightParams.Hp <= this.targetFL)
        } else if (this.targetTime) {
            reachTarget = (this.targetTime === 0)
        } else if (this.speedInstructionValue) {
            reachTarget = (Math.abs(this.flightParams.speed.CAS - knotToMs(this.speedInstructionValue))<1)
        }
        if (!reachTarget) {
            if (this.targetROCD) {
                this.descentAtROCD(this.targetROCD / 197)
            } else {
                let ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, this.atmosphereParams.deltaT, this.flightParams.Hp, this.speedInstruction, -1)
                this.force.thrust = this.minimumDescentThrust
                this.computeROCD(ESFValue)
                this.computedVTAS(ESFValue)
                this.updateFlightParams()
            }
        } else  this.idleState = true
    }

    computeSpeedInstruction(speedInstruction) {
        if (speedInstruction === "CONSTANT" || !speedInstruction || speedInstruction === 0) {
            return 'CONSTANT'
        }
        if (speedInstruction < 1) {
            if (this.flightParams.speed.Mach < speedInstruction) {
                return 'ACCELERATION'
            } else if (this.flightParams.speed.Mach === speedInstruction) {
                return 'CONSTANT'
            } else {
                return 'DECELERATION'
            }
        } else {
            if (this.flightParams.speed.CAS < speedInstruction) {
                return 'ACCELERATION'
            } else if (this.flightParams.speed.CAS === speedInstruction) {
                return 'CONSTANT'
            } else {
                return 'DECELERATION'
            }
        }
    }

    updateConditions() {
        this.setAtmosphere()
        this.computeSpeed()
        this.computeAerodynamics()
        this.computeDescentThrust()
        this.computeMaxClimbThrust()
    }

    desCASConstant() {
        this.setAtmosphere()
        this.computeSpeed()
        this.computeAerodynamics()
        this.force.thrust = this.computeDescentThrust()
        let ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, 0, this.flightParams.Hp, "constant", 0)
        let ROCDV = ROCD(this.atmosphereParams.temperature, this.force.thrust, this.force.drag, this.flightParams.speed.TAS, ESFValue, this.flightParams.mass, 0)
        this.flightParams.ROCD = ROCDV
        // console.log(this.flightParams.ROCD*196)
        this.dVTAS = (1 / ESFValue - 1) * Constante.g0 / this.flightParams.speed.TAS * this.flightParams.ROCD
        this.updateFlightParams()
    }

    descentDecel() {
        this.setAtmosphere()
        this.computeSpeed()
        this.computeAerodynamics()
        this.force.thrust = 0
        let ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, 0, this.flightParams.Hp, "decel", -1)
        this.flightParams.ROCD = ROCD(this.atmosphereParams.temperature, this.force.thrust, this.force.drag, this.flightParams.speed.TAS, ESFValue, this.flightParams.mass, 0)
        this.dVTAS = (1 / ESFValue - 1) * Constante.g0 / this.flightParams.speed.TAS * this.flightParams.ROCD

        this.updateFlightParams()
    }

    descentAccel() {
        this.setAtmosphere()
        this.computeSpeed()
        this.computeAerodynamics()
        this.force.thrust = 0
        let ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, 0, this.flightParams.Hp, "accel", -1)
        this.flightParams.ROCD = ROCD(this.atmosphereParams.temperature, this.force.thrust, this.force.drag, this.flightParams.speed.TAS, ESFValue, this.flightParams.mass, 0)
        this.dVTAS = (1 / ESFValue - 1) * Constante.g0 / this.flightParams.speed.TAS * this.flightParams.ROCD
        this.updateFlightParams()
    }

    computeThrustForPallier(target) {
        let thrust = drag(this.atmosphereParams.airDensity, target, parseFloat(this.flightCoefficients.aerodynamics.wingSurfaceArea), 0, parseFloat(this.flightCoefficients.aerodynamics.parasiticDragCruise), parseFloat(this.flightCoefficients.aerodynamics.inducedDragCruise), this.flightParams.mass)
        this.force.thrust = thrust
    }

    accel() {
        this.setAtmosphere()
        this.computeSpeed()
        this.computeAerodynamics()
        let target = 800
        if (Math.abs(this.flightParams.speed.TAS - knotToMs(target)) < 1) {
            this.computeThrustForPallier(knotToMs(target))
        } else {
            this.computeThrust()
        }
        this.flightParams.ROCD = 0
        this.dVTAS = (this.force.thrust - this.force.drag) / this.flightParams.mass

        this.updateFlightParams()
    }

    decel() {
        this.setAtmosphere()
        this.computeSpeed()
        this.computeAerodynamics()
        let target = 380
        if (Math.abs(this.flightParams.speed.TAS - knotToMs(target)) < 1) {
            this.computeThrustForPallier(knotToMs(target))
        } else {
            this.computeThrust()
        }
        this.flightParams.ROCD = 0
        this.dVTAS = (this.force.thrust - this.force.drag) / this.flightParams.mass
        this.updateFlightParams()
    }

    climbAtROCD(targetROCD) {
        this.updateConditions()
        let state
        let ESFValue
        let thrustToReachTarget = this.force.drag + targetROCD / this.flightParams.speed.TAS * this.flightParams.mass * Constante.g0 + this.dVTAS * this.flightParams.mass
        this.force.thrust = Math.max(Math.min(thrustToReachTarget, this.maxThrust), 0)
        if (thrustToReachTarget >= this.maxThrust) {
            // Thrust et Vitesse limitantes
            if (Math.abs(this.flightParams.speed.TAS - CAStoTAS(this.minSpeed, this.atmosphereParams.pressure, this.atmosphereParams.temperature)) < .5) {
                ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, 0, this.flightParams.Hp, "CONSTANT", 1)
                this.flightParams.ROCD = ROCD(this.atmosphereParams.temperature, this.force.thrust, this.force.drag, this.flightParams.speed.TAS, ESFValue, this.flightParams.mass, 0)
                let dVTAS = (1 / ESFValue - 1) * Constante.g0 / this.flightParams.speed.TAS * this.flightParams.ROCD
                this.dVTAS = dVTAS
                state = "speedLimit"
            }
            // Thrust limitant, déceleration nécessaire
            else {
                let ROCD
                if (this.flightParams.ROCD === 0) {
                    ROCD = targetROCD
                }
                ROCD = ((this.force.thrust - this.force.drag) * this.flightParams.speed.TAS - this.flightParams.mass * this.flightParams.speed.TAS * this.dVTAS) / this.flightParams.mass / Constante.g0
                ROCD = targetROCD
                // ESFValue =  (1+this.flightParams.speed.TAS/Constante.g0*this.dVTAS/this.flightParams.ROCD)**(-1)
                this.flightParams.ROCD = ROCD
                let dVTAS = (this.force.thrust - this.force.drag) / this.flightParams.mass - this.flightParams.ROCD * Constante.g0 / this.flightParams.speed.TAS
                this.dVTAS = dVTAS
                state = "thrustLimit"
            }
        } else {
            ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, 0, this.flightParams.Hp, "CONSTANT", 1)
            this.flightParams.ROCD = ROCD(this.atmosphereParams.temperature, this.force.thrust, this.force.drag, this.flightParams.speed.TAS, ESFValue, this.flightParams.mass, 0)
            let dVTAS = (1 / ESFValue - 1) * Constante.g0 / this.flightParams.speed.TAS * this.flightParams.ROCD
            this.dVTAS = dVTAS
            state = "noLimit"
        }
        this.updateFlightParams()
        this.flightParams.speed.TAS = Math.max(this.flightParams.speed.TAS, CAStoTAS(this.minSpeed, this.atmosphereParams.pressure, this.atmosphereParams.temperature))
        this.ROCDLimit = state
        return state

    }

    descentAtROCD() {

    }


    updateFlightParams() {
        this.flightParams.speed.TAS += this.dVTAS
        this.distanceFromStartPoint += this.flightParams.speed.TAS*Math.sqrt(1-(this.flightParams.ROCD/this.flightParams.speed.TAS)**2)
        this.flightParams.Hp += this.flightParams.ROCD
        this.flightParams.Hp = Math.max(this.flightParams.Hp, 0)
        if (this.flightParams.Hp === 0) {
            this.flightParams.ROCD = 0
        }
    }
}
