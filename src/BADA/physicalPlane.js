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
        this.flightParams.Hp = altitude
        this.flightParams.speed.CAS = speed
        this.atmosphereParams.deltaT = deltaT
        this.dVTAS = 0
        this.setAtmosphere()
        this.flightParams.speed.TAS = CAStoTAS(this.flightParams.speed.CAS, this.atmosphereParams.pressure, this.atmosphereParams.temperature)
        this.flightParams.ROCD = ROCD
        if (ROCD ===0) {
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

    loiChelou(speed){
        this.setLoiMontee(speed, TAStoMach(CAStoTAS(knotToMs(speed), this.atmosphereParams.pressure, this.atmosphereParams.temperature), this.atmosphereParams.temperature))
        // console.log(this.loiMontee.HpTrans)
    }

    computeMinSpeed(){
        // Buffeting a 1.2g
        this.lowSpeedBuffetingLimit = lowSpeedBuffetting(parseFloat( this.flightCoefficients.aerodynamics.buffetGradient), parseFloat( this.flightCoefficients.aerodynamics.buffetCoefficient),  this.atmosphereParams.pressure, parseFloat( this.flightCoefficients.aerodynamics.wingSurfaceArea), this.flightParams.mass*Constante.g0)
        this.Vstall = parseFloat(this.flightCoefficients.aerodynamics.stallSpeedCruise)/10
        // VminStall prend un facteur 1.3 ou 1.2 selon la conf
        this.VminStall = minimumSpeed(this.Vstall, "")
        if (this.flightParams.Hp*3.28084>15000){
            this.minSpeed = Math.max(knotToMs(this.VminStall),TAStoCAS(MachtoTAS(this.lowSpeedBuffetingLimit, this.atmosphereParams.temperature), this.atmosphereParams.pressure, this.atmosphereParams.temperature))
        }
        else this.minSpeed = knotToMs(this.VminStall)
    }

    computeMaxSpeed(){
        this.maxSpeed = Math.min(knotToMs(parseFloat(this.flightCoefficients.aircraftFlightEnvelope.maxOperatingSpeed)/10),TAStoCAS(MachtoTAS(parseFloat(this.flightCoefficients.aircraftFlightEnvelope.maxOperatingMachNumber), this.atmosphereParams.temperature), this.atmosphereParams.pressure, this.atmosphereParams.temperature))
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

    computeDescentThrust(){
        let selectedCoefficient
        if (this.flightParams.Hp > this.loiDescente.HpTrans){
            selectedCoefficient = parseFloat(this.flightCoefficients.aircraftEngineThrust.highAltitudeDescentThrust)
        }
        else{
            switch (this.configuration){
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
        this.maxThrustCruise = 0.95 * this.maxThrust
    }

    monteeCASConstant() {
        this.setAtmosphere()
        this.computeSpeed()
        this.computeAerodynamics()
        this.computeThrust()
        let ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, this.atmosphereParams.deltaT, this.flightParams.Hp, "constant", 0)
        //console.log(ESFValue)
        let ROCDV = ROCD(this.atmosphereParams.temperature, this.force.thrust, this.force.drag, this.flightParams.speed.TAS, ESFValue, this.flightParams.mass, this.atmosphereParams.deltaT)
        this.flightParams.ROCD = ROCDV
        this.dVTAS = (1 / ESFValue - 1) * Constante.g0 / this.flightParams.speed.TAS * this.flightParams.ROCD * (this.atmosphereParams.temperature / (this.atmosphereParams.temperature - this.atmosphereParams.deltaT))
        this.flightParams.speed.TAS += this.dVTAS
        this.updateFlightParams()
    }

    palier(){
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

    update(){
        this.setAtmosphere()
        this.computeSpeed()
        this.computeAerodynamics()
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
        this.flightParams.speed.TAS += this.dVTAS
        this.updateFlightParams()
    }

    monteeDecel() {
        this.setAtmosphere()
        this.computeSpeed()
        this.computeAerodynamics()
        this.computeThrust()
        let ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, 0, this.flightParams.Hp, "decel", 1)
        this.flightParams.ROCD = ROCD(this.atmosphereParams.temperature, this.force.thrust, this.force.drag, this.flightParams.speed.TAS, ESFValue, this.flightParams.mass, 0)
        let dVTAS = (1 / ESFValue - 1) * Constante.g0 / this.flightParams.speed.TAS * this.flightParams.ROCD
        this.flightParams.speed.TAS += dVTAS
        this.updateFlightParams()
    }

    monteeAccel() {
        this.setAtmosphere()
        this.computeSpeed()
        this.computeAerodynamics()
        this.computeThrust()
        let ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, 0, this.flightParams.Hp, "accel", 1)
        this.flightParams.ROCD = ROCD(this.atmosphereParams.temperature, this.force.thrust, this.force.drag, this.flightParams.speed.TAS, ESFValue, this.flightParams.mass, 0)
        let dVTAS = (1 / ESFValue - 1) * Constante.g0 / this.flightParams.speed.TAS * this.flightParams.ROCD
        this.flightParams.speed.TAS += dVTAS
        this.updateFlightParams()
    }

    descentDecel() {
        this.setAtmosphere()
        this.computeSpeed()
        this.computeAerodynamics()
        this.force.thrust = 0
        let ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, 0, this.flightParams.Hp, "decel", -1)
        this.flightParams.ROCD = ROCD(this.atmosphereParams.temperature, this.force.thrust, this.force.drag, this.flightParams.speed.TAS, ESFValue, this.flightParams.mass, 0)
        let dVTAS = (1 / ESFValue - 1) * Constante.g0 / this.flightParams.speed.TAS * this.flightParams.ROCD
        this.flightParams.speed.TAS += dVTAS
        // console.log(this)
        this.updateFlightParams()
    }

    descentAccel() {
        this.setAtmosphere()
        this.computeSpeed()
        this.computeAerodynamics()
        this.force.thrust = 0
        let ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, 0, this.flightParams.Hp, "accel", -1)
        this.flightParams.ROCD = ROCD(this.atmosphereParams.temperature, this.force.thrust, this.force.drag, this.flightParams.speed.TAS, ESFValue, this.flightParams.mass, 0)
        let dVTAS = (1 / ESFValue - 1) * Constante.g0 / this.flightParams.speed.TAS * this.flightParams.ROCD
        this.flightParams.speed.TAS += dVTAS
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
        let dVTAS = (this.force.thrust - this.force.drag) / this.flightParams.mass
        this.flightParams.speed.TAS += dVTAS
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
        let dVTAS = (this.force.thrust - this.force.drag) / this.flightParams.mass
        this.flightParams.speed.TAS += dVTAS
        this.updateFlightParams()
    }

    climbAtROCD(targetROCD) {
        this.updateConditions()
        let state
        let ESFValue
        let thrustToReachTarget = this.force.drag + targetROCD / this.flightParams.speed.TAS * this.flightParams.mass * Constante.g0 + this.dVTAS * this.flightParams.mass
       // console.log(thrustToReachTarget/this.maxThrust)
        this.force.thrust = Math.max(Math.min(thrustToReachTarget, this.maxThrust), 0)
        //console.log("%Poussée : ", this.force.thrust/this.maxThrust)
        //console.log("%ROCD : ", this.flightParams.ROCD/targetROCD)
        // console.log(thrustToReachTarget, this.maxThrust)
        if (thrustToReachTarget >= this.maxThrust) {
            // Thrust et Vitesse limitantes

            if (Math.abs(this.flightParams.speed.TAS - CAStoTAS(this.minSpeed, this.atmosphereParams.pressure, this.atmosphereParams.temperature)) < .5) {
                //console.error(1)
                // console.log(msToKnot(this.minSpeed*1.23))
                // console.log("STALL LIMIT")
                ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, 0, this.flightParams.Hp, "constant", 1)
                this.flightParams.ROCD = ROCD(this.atmosphereParams.temperature, this.force.thrust, this.force.drag, this.flightParams.speed.TAS, ESFValue, this.flightParams.mass, 0)
                let dVTAS = (1 / ESFValue - 1) * Constante.g0 / this.flightParams.speed.TAS * this.flightParams.ROCD
                this.dVTAS = dVTAS
                this.flightParams.speed.TAS += dVTAS
                this.flightParams.speed.TAS = Math.max(this.flightParams.speed.TAS, CAStoTAS(this.minSpeed, this.atmosphereParams.pressure, this.atmosphereParams.temperature))
                state = "speedLimit"
            }
            // Thrust limitant, déceleration nécessaire
            else {
                // console.error(2)
                // console.log('CAS 2')
                let ROCD

                // ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, 0, this.flightParams.Hp, "decel", 1)
                if (this.flightParams.ROCD === 0){
                    // ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, 0, this.flightParams.Hp, "decel", 1)
                    ROCD = targetROCD
                }
                //else {

               // }
                ROCD = ((this.force.thrust - this.force.drag)*this.flightParams.speed.TAS - this.flightParams.mass*this.flightParams.speed.TAS*this.dVTAS)/this.flightParams.mass/Constante.g0
                ROCD = targetROCD

                // ESFValue =  (1+this.flightParams.speed.TAS/Constante.g0*this.dVTAS/this.flightParams.ROCD)**(-1)
                this.flightParams.ROCD = ROCD
                let dVTAS = (this.force.thrust - this.force.drag) / this.flightParams.mass - this.flightParams.ROCD * Constante.g0 / this.flightParams.speed.TAS
                this.dVTAS = dVTAS
                this.flightParams.speed.TAS += dVTAS
                this.flightParams.speed.TAS = Math.max(this.flightParams.speed.TAS, CAStoTAS(this.minSpeed, this.atmosphereParams.pressure, this.atmosphereParams.temperature))
                state = "thrustLimit"
            }

            // console.log("maxThrust")
            // ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, 0, this.flightParams.Hp, "decel", 1)
        } else {
            // console.error(3)
            ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, 0, this.flightParams.Hp, "constant", 1)
            this.flightParams.ROCD = ROCD( this.atmosphereParams.temperature, this.force.thrust, this.force.drag, this.flightParams.speed.TAS, ESFValue, this.flightParams.mass, 0)
            let dVTAS = (1 / ESFValue - 1) * Constante.g0 / this.flightParams.speed.TAS * this.flightParams.ROCD
            this.dVTAS = dVTAS
            this.flightParams.speed.TAS += dVTAS
            state = "noLimit"
        }
        // console.log(this.flightParams.Hp*3.28084/100)
        this.updateFlightParams()
        return state

    }

    descentAtROCD() {

    }

    updateConditions(){
        this.setAtmosphere()
        this.computeSpeed()
        this.computeAerodynamics()
        this.computeMaxClimbThrust()
    }


    updateFlightParams() {
        this.flightParams.Hp += this.flightParams.ROCD
        this.flightParams.Hp = Math.max(this.flightParams.Hp, 0)
        if (this.flightParams.Hp===0){
            this.flightParams.ROCD =0
        }
    }
}
