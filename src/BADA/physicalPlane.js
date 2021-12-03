import {
    airDensity,
    airPressure,
    CAStoTAS, drag, ESF, HpTrans,
    knotToMs,
    lowSpeedBuffetting, MachtoTAS, maxClimbTOThrustJET, minimumSpeed, ROCD,
    TAStoCAS,
    TAStoMach,
    temperature
} from "@/BADA/func.js"
import {Constante} from "@/BADA/constantes.js"
import {msToKnot} from "./func";

export class PhysicalPlane {
    flightCoefficients

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

    flightEnvelope = {
        optFL: ""
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

    constructor(flightCoefficient) {
        this.flightCoefficients = flightCoefficient
    }

    setParameters(massCoefficient) {
        this.flightParams.mass = parseFloat(this.flightCoefficients.aircraftStandardMass.maximumMass)*massCoefficient/100
    }

    setMass(mass) {
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

    computeThrustSpecificFuelConsumption() {
        let engType = this.flightCoefficients.acTypeData.engineType
        if (engType === "JET"){
            let Cf1 = parseFloat(this.flightCoefficients.aircraftFuelConsumption.firstThrustConsumption.JET.jetConsumption)
            let Cf2 = parseFloat(this.flightCoefficients.aircraftFuelConsumption.secondThrustConsumption)
            this.specificFuelConsumption = Cf1 * (1 + msToKnot(this.flightParams.speed.TAS) / Cf2)
        }
        // this.flightCoefficients.aircraftFuelConsumption.firstThrustConsumption =
        // let Cf1 = parseFloat(this.flightCoefficients.aircraftFuelConsumption.firstThrustConsumption.JET.jetConsumption)
        // let Cf2 = parseFloat(this.flightCoefficients.aircraftFuelConsumption.secondThrustConsumption)
        // this.specificFuelConsumption = Cf1 * (1 + msToKnot(this.flightParams.speed.TAS) / Cf2)
        // console.log(this.specificFuelConsumption)
    }

    computeNominalFuelFlow() {
        this.computeThrustSpecificFuelConsumption()
        let engType = this.flightCoefficients.acTypeData.engineType
        if (engType === "JET"){
            return this.nominalFuelFlow = this.specificFuelConsumption * this.force.thrust / 1000
        }

    }

    computeMinimumFuelFlow() {
        let engType = this.flightCoefficients.acTypeData.engineType
        if (engType === "JET"){
            let Cf3 = parseFloat(this.flightCoefficients.aircraftFuelConsumption.firstDescentConsumption)
            let Cf4 = parseFloat(this.flightCoefficients.aircraftFuelConsumption.secondDescentConsumption)
            return this.minimumFuelFlow = Cf3 * (1 - this.flightParams.Hp * 3.28084 / Cf4)
        }

    }

    computeCruiseFuelFlow() {
        this.computeThrustSpecificFuelConsumption()
        let engType = this.flightCoefficients.acTypeData.engineType
        if (engType === "JET"){
            let CfCr = parseFloat(this.flightCoefficients.aircraftFuelConsumption.cruiseConsumption)
            return this.cruiseFuelFlow = this.specificFuelConsumption * this.force.thrust / 1000 * CfCr
        }

    }

    computeFuelFlow() {
        this.fuelFlow = 0
        switch (this.flightPhase) {
            case "LEVELLED":
                this.fuelFlow = this.computeCruiseFuelFlow()
                break
            case "CLIMB":
                this.fuelFlow = this.computeNominalFuelFlow()
                break
            case "DESCENT":
                this.fuelFlow = this.computeMinimumFuelFlow()
                break
        }
    }

    setInitialState(altitude, speed, ROCD, deltaT) {
        this.idleState = true
        this.flightParams.mass = parseFloat(this.flightCoefficients.aircraftStandardMass.referenceMass)
        this.distanceFromStartPoint = 0
        this.flightParams.Hp = altitude
        if (speed === 0 ){
            this.flightParams.speed.CAS = knotToMs(Constante.CvminTO * parseFloat(this.flightCoefficients.aerodynamics.stallSpeedTakeoff)/10 + 15)
        } else this.flightParams.speed.CAS = speed


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

    computeMaxAltitude(){
        if (parseFloat(this.flightCoefficients.flightEnvelope.maxAltitudeAtMTOW) === 0){
            return this.flightCoefficients.flightEnvelope.maxOperatingAltitude
        }
        else {
            let hMO = parseFloat(this.flightCoefficients.flightEnvelope.maxOperatingAltitude)
            let hMAX = parseFloat(this.flightCoefficients.flightEnvelope.maxAltitudeAtMTOW)
            let Gt = parseFloat(this.flightCoefficients.flightEnvelope.altitudeTemperatureGradient)
            let A = Math.max(this.atmosphereParams.deltaT - parseFloat(this.flightCoefficients.aircraftEngineThrust.firstThrustTemperatureCoefficient),0)
            Math.min(hMO, hMAX + Gt*A+this.flightCoefficients.flightEnvelope.weightGradient*(this.flightCoefficients.aircraftStandardMass.maximumMass-this.flightParams.mass))
        }
    }


    optAlt() {
        let optFL
        let maxSpecRange = 0
        let specRange
        let maxFL = 100
        for (let FL = 100; FL <= maxFL; FL += 2) {
            let calculatedTemperature = temperature(this.atmosphereParams.deltaT, FL * 100 / 3.28084)
            let pressure = airPressure(this.atmosphereParams.deltaT, FL * 100 / 3.28084)
            let calculatedairDensity = airDensity(pressure, calculatedTemperature)
            let TAS = MachtoTAS(0.74, calculatedTemperature)
            // let calcDrag = drag(calculatedairDensity, TAS, parseFloat(this.flightCoefficients.aerodynamics.wingSurfaceArea), 0, parseFloat(this.flightCoefficients.aerodynamics.parasiticDragCruise), parseFloat(this.flightCoefficients.aerodynamics.inducedDragCruise), this.flightParams.mass)
            let Cf1 = parseFloat(this.flightCoefficients.aircraftFuelConsumption.firstThrustConsumption)
            let Cf2 = parseFloat(this.flightCoefficients.aircraftFuelConsumption.secondThrustConsumption)
            let specificFuelConsumption = Cf1 * (1 + msToKnot(TAS) / Cf2)
            let CfCr = parseFloat(this.flightCoefficients.aircraftFuelConsumption.cruiseConsumption)
            let thrust = drag(calculatedairDensity, TAS, parseFloat(this.flightCoefficients.aerodynamics.wingSurfaceArea), 0, parseFloat(this.flightCoefficients.aerodynamics.parasiticDragCruise), parseFloat(this.flightCoefficients.aerodynamics.inducedDragCruise), this.flightParams.mass)
            let fuelFlow = specificFuelConsumption * thrust / 1000 * CfCr

            specRange = TAS / 60 / (fuelFlow)
            if (specRange > maxSpecRange) {
                maxSpecRange = specRange
                optFL = FL
            }
        }
        this.flightEnvelope.optFL = optFL
    }

    computeSpeed() {
        // this.computeMinSpeed()
        this.getActualMinSpeed()
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

    getDragCoefficients(){
        let phase = this.getPhase()
        let CD0, CD2
        let CD0cruise = parseFloat(this.flightCoefficients.aerodynamics.parasiticDragCruise)
        let CD2cruise = parseFloat(this.flightCoefficients.aerodynamics.inducedDragCruise)
        let CD0app = parseFloat(this.flightCoefficients.aerodynamics.parasiticDragApproach)
        let CD2app = parseFloat(this.flightCoefficients.aerodynamics.inducedDragApproach)
        let CD0landing = parseFloat(this.flightCoefficients.aerodynamics.parasiticDragLanding)
        let CD2landing = parseFloat(this.flightCoefficients.aerodynamics.inducedDragLanding)
        let CD0Dlanding = parseFloat(this.flightCoefficients.aerodynamics.parasiticDragLandingGear)
        switch (phase) {
            case "TAKEOFF" :
                CD0 = CD0cruise
                CD2 = CD2cruise
                break
            case "INITIALCLIMB" :
                CD0 = CD0cruise
                CD2 = CD2cruise
                break
            case "CRUISE" :
                CD0 = CD0cruise
                CD2 = CD2cruise
                break
            case "APPROACH" :
                if (CD0app === 0 || CD2app ===0){
                    CD0 = CD0cruise
                    CD2 = CD2cruise
                } else {
                    CD0 = CD0app
                    CD2 = CD2app
                }
                break
            case "LANDING" :
                if (CD0landing === 0 || CD2landing ===0){
                    CD0 = CD0cruise
                    CD2 = CD2cruise
                }
                else {
                    CD0 = CD0landing + CD0Dlanding
                    CD2 = CD2landing
                }
                break
        }
        return {CD0: CD0, CD2: CD2}
    }

    computeAerodynamics() {
        let dragCoefficient = this.getDragCoefficients()
        // console.log(dragCoefficient)


        this.force.drag = drag(this.atmosphereParams.airDensity, this.flightParams.speed.TAS, parseFloat(this.flightCoefficients.aerodynamics.wingSurfaceArea), 0, dragCoefficient.CD0, dragCoefficient.CD2, this.flightParams.mass)

        // console.log(this.flightParams.mass)
        // console.log(this.atmosphereParams.airDensity)
        //
        // console.log(this.force.drag)
    }

    computeThrust() {
        this.computeMaxClimbThrust()
        this.computeMaxCruiseThrust()
        this.force.thrust = this.maxThrust
    }

    computeMaxClimbThrust() {
        let engType = this.flightCoefficients.acTypeData.engineType
        if (engType === "JET"){
            let Ctc1 = parseFloat(this.flightCoefficients.aircraftEngineThrust.firstMaxClimbThrust.JET.jetPiston)
            let Ctc2 = parseFloat(this.flightCoefficients.aircraftEngineThrust.secondMaxClimbThrust)
            let Ctc3 = parseFloat(this.flightCoefficients.aircraftEngineThrust.thirdMaxClimbThrust.JET.jetCoef)
            // let Ctc4 = parseFloat(this.flightCoefficients.aircraftEngineThrust.firstThrustTemperatureCoefficient)
            // let Ctc5 = parseFloat(this.flightCoefficients.aircraftEngineThrust.secondThrustTemperatureCoefficient)
            this.maxThrust = parseFloat(maxClimbTOThrustJET(Ctc1, Ctc2, Ctc3, this.flightParams.Hp))
        }
        else if (engType === "TURBOPROP"){
            let Ctc1 = parseFloat(this.flightCoefficients.aircraftEngineThrust.firstMaxClimbThrust.TURBOPROP.turbo)
            let Ctc2 = parseFloat(this.flightCoefficients.aircraftEngineThrust.secondMaxClimbThrust)
            let Ctc3 = parseFloat(this.flightCoefficients.aircraftEngineThrust.thirdMaxClimbThrust.TURBOPROP.turbopropCoef)
            let A = Ctc1/msToKnot(this.flightParams.speed.TAS)
            let B = 1 - this.flightParams.Hp*3.28084/Ctc2
            this.maxThrust = A*B + Ctc3
        }
        else if (engType === "PISTON"){
            let Ctc1 = parseFloat(this.flightCoefficients.aircraftEngineThrust.firstMaxClimbThrust.PISTON.jetPiston)
            let Ctc2 = parseFloat(this.flightCoefficients.aircraftEngineThrust.secondMaxClimbThrust)
            let Ctc3 = parseFloat(this.flightCoefficients.aircraftEngineThrust.thirdMaxClimbThrust.PISTON.pistonCoef)
            let A = Ctc3/msToKnot(this.flightParams.speed.TAS)
            let B = 1 - this.flightParams.Hp*3.28084/Ctc2
            this.maxThrust = Ctc1*B + A
        }
        return this.maxThrust
    }

    computeDescentThrust() {
        let selectedCoefficient
        let phase = this.getPhase()
        if (this.flightParams.Hp > this.loiDescente.HpTrans) {
            selectedCoefficient = parseFloat(this.flightCoefficients.aircraftEngineThrust.highAltitudeDescentThrust)
        } else {
            switch (phase) {
                // case "TAKEOFF" :
                //     selectedCoefficient = parseFloat(this.flightCoefficients.aircraftEngineThrust.lowAltitudeDescentThrust)
                //     break
                // case "INITIALCLIMB" :
                //     selectedCoefficient = parseFloat(this.flightCoefficients.aircraftEngineThrust.lowAltitudeDescentThrust)
                //     break
                case "CRUISE" :
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

    getStallSpeed(){
        let stallSpeed
        let phase = this.getPhase()
        switch (phase) {
            case "TAKEOFF" :
                stallSpeed = this.flightCoefficients.aerodynamics.stallSpeedTakeoff
                break
            case "INITIALCLIMB" :
                stallSpeed = this.flightCoefficients.aerodynamics.stallSpeedInitialClimbing
                break
            case "CRUISE" :
                stallSpeed = this.flightCoefficients.aerodynamics.stallSpeedCruise
                break
            case "APPROACH" :
                stallSpeed = this.flightCoefficients.aerodynamics.stallSpeedApproaching
                break
            case "LANDING" :
                stallSpeed = this.flightCoefficients.aerodynamics.stallSpeedLanding
                break
        }
        return this.stallSpeed = parseFloat(stallSpeed)/10
    }

    getLowSpeedBuffetingLimit(){
        let type = this.flightCoefficients.acTypeData.engineType
        if (parseFloat(this.flightCoefficients.aerodynamics.buffetGradient) === 0 || parseFloat(this.flightCoefficients.aerodynamics.buffetCoefficient) === 0 || type !== 'JET'){
            return null
        } else{
            return this.lowSpeedBuffetingLimit = lowSpeedBuffetting(parseFloat(this.flightCoefficients.aerodynamics.buffetGradient), parseFloat(this.flightCoefficients.aerodynamics.buffetCoefficient), this.atmosphereParams.pressure, parseFloat(this.flightCoefficients.aerodynamics.wingSurfaceArea), this.flightParams.mass * Constante.g0)
        }
    }

    getActualMinSpeed(){
        let lSBL =  this.getLowSpeedBuffetingLimit()
        let Vmin = this.getVmin()
        if (lSBL){
            if (this.flightParams.Hp * 3.28084 > 15000) {
                this.minSpeed = Math.max(knotToMs(Vmin), TAStoCAS(MachtoTAS(lSBL, this.atmosphereParams.temperature), this.atmosphereParams.pressure, this.atmosphereParams.temperature))
            } else this.minSpeed = knotToMs(Vmin)
        } else this.minSpeed = knotToMs(Vmin)

        return this.minSpeed
    }

    getVmin(){
        let stallSpeed = this.getStallSpeed()
        let phase = this.getPhase()
        let Vmin
        if (phase === "TAKEOFF"){
            Vmin = Constante.CvminTO * stallSpeed
        } else Vmin = Constante.Cvmin * stallSpeed
        return this.Vmin = Vmin
    }

    getPhase(){
        let phase
        let ROCD = this.flightParams.ROCD
        let Hp = this.flightParams.Hp*3.28084
        let speed = msToKnot(this.flightParams.speed.CAS)
        // console.log("hi")
        if (ROCD > 0){
            if (Hp < 400){
                phase = "TAKEOFF"
            }
            else if (Hp < 2000){
                phase = "INITIALCLIMB"
            }
            else if (Hp >= 2000){
                phase = "CRUISE"
            }
        }
        else {
            if (Hp >= 8000){
                phase = "CRUISE"
            }
            else if (Hp < 3000){
                if (speed < Constante.Cvmin * parseFloat(this.flightCoefficients.aerodynamics.stallSpeedApproaching)/10 + 10){
                    phase = "LANDING"
                }
                else {
                    phase = "APPROACH"
                }
            }
            else if (Hp < 8000){
                if (speed >= Constante.Cvmin * parseFloat(this.flightCoefficients.aerodynamics.stallSpeedCruise)/10 + 10){
                    phase = "CRUISE"
                }
                else {
                    phase = "APPROACH"
                }
            }
        }
        return this.phase = phase
    }

    climbAtSpeed(ESFValue) {
        this.computeROCD(ESFValue)
        this.computedVTAS(ESFValue)
        this.updateFlightParams()
    }

    computeROCD(ESFValue) {
        this.flightParams.ROCD = (ROCD(this.atmosphereParams.temperature, this.force.thrust, this.force.drag, this.flightParams.speed.TAS, ESFValue, this.flightParams.mass, 0))
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
        // console.log(this.targetTime, this.targetFL, this.targetSpeed)
        // console.log("FL : ", this.flightParams.Hp / 100 * 3.28084)
        // console.log("speed : ", msToKnot(this.flightParams.speed.CAS))
        // console.log("phase : ", this.flightPhase)
        // console.log("phase : ", this.atmosphereParams)
        // console.log("phase : ", this.atmosphereParams)
        // console.log("targetSpeed : ", this.restrictedTarget)
        this.updateConditions()
        switch (this.flightPhase) {
            case "LEVEL":
                this.level()
                // this.optAlt()
                break
            case "CLIMB":
                this.climb2()
                // console.log("hey")
                break
            case "DESCENT":
                this.descent2()
                break
        }
        if (this.targetTime) {
            this.targetTime--
        }

        // this.speedVariation = this.getSpeedVariation(this.speedInstruction)
        // console.log(this.speedInstruction)
        // console.log(this.speedVariation)
        // this.setSpeedInstructionValue(this.speedInstruction)
        // this.setTarget(null, null, null, this.speedInstructionValue)
    }

    levelInstruction(time) {
        this.idleState = false
        this.flightPhase = 'LEVELLED'
        this.setTarget('', time, '', '')
    }

    level() {
        let reachTarget
        // console.log(this.targetTime)
        let reachTime = this.timeCheck()

        reachTarget = reachTime

        if (!reachTarget) {
            this.computeThrustForPallier(this.flightParams.speed.TAS)
            let ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, this.atmosphereParams.deltaT, this.flightParams.Hp, "CONSTANT", 0)
            this.flightParams.ROCD = (ROCD(this.atmosphereParams.temperature, this.force.thrust, this.force.drag, this.flightParams.speed.TAS, ESFValue, this.flightParams.mass, this.atmosphereParams.deltaT) + 9 * this.flightParams.ROCD) / 10
            this.dVTAS = (this.force.thrust - this.force.drag) / this.flightParams.mass
            // console.log("hi")
            this.updateFlightParams()
        } else {
            // console.warn('END OF LEVEL INSTRUCTION')
            this.idleState = true
        }

    }

    climbInstruction(target, time, ROCD, speedInstruction) {
        this.idleState = false
        this.flightPhase = 'CLIMB'
        if (speedInstruction === "law") {
            speedInstruction = this.loiMontee.CAS
        }

        this.speedInstruction = speedInstruction
        this.speedVariation = this.getSpeedVariation(speedInstruction)
        // console.log(this.speedVariation, this.speedInstruction)
        // this.setSpeedInstructionValue(speedInstruction)
        // console.log(this.speedVariation, this.speedInstructionValue)
        this.setTarget(target, time, ROCD, this.speedInstruction)
    }

    getTargetInstruction(targetZ, targetTime, targetROCD, targetSpeed) {
        if (targetZ) {
            this.setTargetAltitude(targetZ)
        }

        if (targetTime) {
            this.setTargetTime(targetTime)
        }

        if (targetROCD) {
            this.setTargetROCD(targetROCD)
        }

        if (targetSpeed) {
            this.setTargetSpeed(targetSpeed)
        }

        // console.log(this.targetTime, this.targetSpeed, this.targetFL, this.flightPhase)

        this.idleState = false
    }

    setTargetAltitude(targetZ) {
        let targetHp
        let targetFL
        if (targetZ > 660) {
            targetHp = targetZ / 3.28084
            targetFL = targetZ / 100
        } else {
            targetHp = targetZ / 3.28084 * 100
            targetFL = targetZ
        }
        if (Math.abs(this.flightParams.Hp - this.targetHp)<1) {
            this.flightPhase = "LEVEL"
        }
        else if (this.flightParams.Hp > targetHp) {
            this.flightPhase = "DESCENT"
        } else if (this.flightParams.Hp < targetHp) {
            this.flightPhase = "CLIMB"
        }

        this.targetFL = targetFL
    }

    setTargetROCD(targetROCD) {
        this.targetROCD = targetROCD
    }

    setTargetTime(targetTime) {
        this.targetTime = targetTime
    }

    setTargetSpeed(targetSpeed) {
        if (targetSpeed === "law") {
            targetSpeed = this.loiMontee.CAS
            this.targetMach = this.loiMontee.Mach
        }
        this.targetSpeed = targetSpeed
        this.speedVariation = this.getSpeedVariation(targetSpeed)
    }

    climb2() {
        let reachAltitude = this.altitudeCheck()

        let reachTime = this.timeCheck()

        let reachSpeed = this.speedCheck()

        if (this.INTERCEPTION) {
            // console.error("INTERCEPT")
            let t = this.t
            let ROCDbis = (this.h) / this.Tx * (Math.exp(-t / this.Tx))
            this.t++
            this.climbAtROCD(ROCDbis)
            return
        }

        let reachAllTargets = reachTime && reachAltitude && reachSpeed

        if (!reachAllTargets) {
            if (this.targetROCD) {
                this.climbAtROCD(this.targetROCD / 197)
            } else {
                let ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, this.atmosphereParams.deltaT, this.flightParams.Hp, this.speedVariation.variation, 1)


                this.force.thrust = this.maxThrust
                // console.log(this.force.drag)

                this.computeROCD(ESFValue)
                // console.log(this.flightParams.ROCD)
                this.computedVTAS(ESFValue)
                // console.log(this.flightParams.speed.TAS)
                this.updateFlightParams()
            }
        } else {
            // console.warn('END OF CLIMB INSTRUCTION')
            this.idleState = true
        }
    }

    descent2() {
        let reachAltitude = this.altitudeCheck()

        let reachTime = this.timeCheck()

        let reachSpeed = this.speedCheck()

        if (this.INTERCEPTION) {
            let t = this.t
            let ROCDbis = this.h / this.Tx * (Math.exp(-t / this.Tx))
            this.t++
            this.descentAtROCD(ROCDbis)
            return
        }

        let reachAllTargets = reachTime && reachAltitude && reachSpeed

        if (!reachAllTargets) {
            if (this.targetROCD) {
                this.climbAtROCD(this.targetROCD / 197)
            } else {
                let ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, this.atmosphereParams.deltaT, this.flightParams.Hp, this.speedVariation.variation, -1)
                this.force.thrust = this.minimumDescentThrust
                this.computeROCD(ESFValue)
                this.computedVTAS(ESFValue)
                this.updateFlightParams()
            }
        } else {
            // console.warn('END OF DESCENT INSTRUCTION')
            this.idleState = true
        }
    }


    altitudeCheck() {
        if (!this.targetFL) {
            return true
        }
        if (Math.abs(this.flightParams.Hp - this.targetFL * 100 / 3.28084) < 1) {
            this.INTERCEPTION = false
            this.flightPhase = "LEVEL"
            return true
        }

        let Tx = Math.abs(this.flightParams.ROCD / Constante.Gmax)
        let h = this.flightParams.ROCD * Tx
        let altIntcpt = this.targetFL * 100 / 3.28084 - h
        if (this.flightPhase === "CLIMB"){
            if (this.flightParams.Hp > altIntcpt && !this.INTERCEPTION) {
                this.startInterception()
            }
        } else if (this.flightPhase === "DESCENT") {
            if (this.flightParams.Hp < altIntcpt && !this.INTERCEPTION) {
                this.startInterception()
            }
        }

    }

    timeCheck(){
        if (!this.targetTime) {
            return true
        }
        // console.log(this.targetTime)
        return (this.targetTime < 0)
    }

    speedCheck(){
        if (!this.targetSpeed) {
            return true
        }

        if (this.flightParams.Hp * 3.28084 > this.loiMontee.HpTrans){
            this.targetSpeed = msToKnot(TAStoCAS(MachtoTAS(this.targetMach, this.atmosphereParams.temperature), this.atmosphereParams.pressure, this.atmosphereParams.temperature))
        }

        this.restrictedTarget = this.applySpeedRestriction()
        this.speedVariation = this.getSpeedVariation(this.restrictedTarget)
        // console.log(this.getSpeedVariation(this.restrictedTarget))

        if (Math.abs(this.flightParams.speed.CAS - knotToMs(this.restrictedTarget)) < 2) {
            // this.flightParams.speed.TAS = CAStoTAS(knotToMs(this.restrictedTarget), this.atmosphereParams.pressure, this.atmosphereParams.temperature)
            return true
        }

    }

    applySpeedRestriction(){
        if (this.flightParams.Hp / 100 * 3.28084 < 100) {
            return  Math.min(250, this.targetSpeed)
        }
        else return  this.targetSpeed
    }


    setSpeedInstructionValue(speedInstruction) {
        if (!this.speedVariation.variation === "CONSTANT") {
            return
        }
        if (this.flightParams.Hp / 100 * 3.28084 < 100) {
            if (this.speedVariation.type === "CAS") {
                this.speedInstructionValue = Math.min(250, speedInstruction)
            } else {
                this.speedInstructionValue = speedInstruction
            }

        }
    }


    descentInstruction(target, time, ROCD, speedInstruction) {
        this.idleState = false
        this.flightPhase = 'DESCENT'
        this.speedVariation = this.getSpeedVariation(speedInstruction)
        this.speedInstruction = speedInstruction
        // console.log(this.speedVariation, this.speedInstructionValue)
        this.setTarget(target, time, ROCD, this.speedInstruction)
    }

    setTarget(target, time, ROCD, speedInstruction) {
        // console.log(this.targetTime, this.targetFL, this.targetSpeed)
        this.targetROCD = ROCD
        if (target != null) {
            this.targetFL = target
        }
        if (time) {
            this.targetTime = time
        }
        if (speedInstruction) {
            this.targetSpeed = speedInstruction
        }
        // console.log(this.targetTime, this.targetFL, this.targetSpeed)
    }

    startInterception() {
        this.t = 0
        this.Tx = Math.abs(this.flightParams.ROCD / Constante.Gmax)
        this.h = this.flightParams.ROCD * this.Tx
        this.INTERCEPTION = true
    }

    climb() {
        // console.log("hi")
        // let reachTargetFL = true
        // let reachTargetTime = true
        // let reachTargetSpeed = true
        let reachTarget
        if (this.targetFL != null) {
            // reachTargetFL = false
            let Tx = this.flightParams.ROCD / Constante.Gmax
            let h = this.flightParams.ROCD * Tx
            let altIntcpt = this.targetFL * 100 / 3.28084 - h
            if (this.flightParams.Hp > altIntcpt && !this.INTERCEPTION) {
                this.startInterception()
            }
            reachTarget = Math.abs(this.flightParams.Hp - this.targetFL * 100 / 3.28084) < 10
            if (reachTarget) {
                this.targetFL = null;
                this.INTERCEPTION = false
            }
        }
        if (this.targetTime) {
            reachTarget = (this.targetTime === 0)
            if (reachTarget) this.targetTime = null
        }
        if (this.targetSpeed) {
            //console.log('checkSpeed')
            // reachTargetSpeed = false
            reachTarget = (Math.abs(this.flightParams.speed.CAS - knotToMs(this.targetSpeed)) < 1)
            if (reachTarget) {
                this.targetSpeed = null
            }
        }

        if (this.INTERCEPTION) {
            let t = this.t
            let ROCDbis = (this.h) / this.Tx * (Math.exp(-t / this.Tx))
            this.t++
            this.climbAtROCD(ROCDbis)
            return
        }

        if (!reachTarget) {
            if (this.targetROCD) {
                this.climbAtROCD(this.targetROCD / 197)
            } else {
                let ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, this.atmosphereParams.deltaT, this.flightParams.Hp, this.speedVariation.variation, 1)
                this.force.thrust = this.maxThrust
                this.computeROCD(ESFValue)
                this.computedVTAS(ESFValue)
                this.updateFlightParams()
            }
        } else this.idleState = true
    }

    descent() {
        let reachTarget
        if (this.targetFL != null) {
            let Tx = Math.abs(this.flightParams.ROCD / Constante.Gmax)
            let h = this.flightParams.ROCD * Tx
            let altIntcpt = this.targetFL * 100 / 3.28084 - h
            if (this.flightParams.Hp < altIntcpt && !this.INTERCEPTION) {
                this.startInterception()
            }
            reachTarget = Math.abs(this.flightParams.Hp - this.targetFL * 100 / 3.28084) < 10
            if (reachTarget) {
                this.targetFL = null;
                this.INTERCEPTION = false
            }
        }
        if (this.targetTime) {
            reachTarget = (this.targetTime === 0)
            if (reachTarget) this.targetTime = null
        }
        if (this.targetSpeed) {
            reachTarget = (Math.abs(this.flightParams.speed.CAS - knotToMs(this.targetSpeed)) < 1)
            if (reachTarget) {
                this.speedInstruction = null;
                this.targetSpeed = null
            }
        }

        if (this.INTERCEPTION) {
            let t = this.t
            let ROCDbis = this.h / this.Tx * (Math.exp(-t / this.Tx))
            this.t++
            this.descentAtROCD(ROCDbis)
            return
        }

        if (!reachTarget) {
            if (this.targetROCD) {
                this.descentAtROCD(this.targetROCD / 197)
            } else {
                //console.log(this.speedInstruction)
                let ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, this.atmosphereParams.deltaT, this.flightParams.Hp, this.speedVariation.variation, -1)
                this.force.thrust = this.minimumDescentThrust
                this.computeROCD(ESFValue)
                this.computedVTAS(ESFValue)
                this.updateFlightParams()
            }
        } else this.idleState = true
    }

    getSpeedVariation(speedInstruction) {
        let variation;
        let type
        if (speedInstruction === "CONSTANT" || !speedInstruction || speedInstruction === 0) {
            variation = 'CONSTANT'
            return {
                type: type,
                variation: variation
            }
        }
        if (speedInstruction < 1) {
            type = "mach"
            if (this.flightParams.speed.Mach < speedInstruction) {
                variation = 'ACCELERATION'
            } else if (this.flightParams.speed.Mach === speedInstruction) {
                variation = 'CONSTANT'
            } else {
                variation = 'DECELERATION'
            }
        } else {
            type = "CAS"
            if (msToKnot(this.flightParams.speed.CAS) < speedInstruction) {
                variation = 'ACCELERATION'
            } else if (Math.abs(this.flightParams.speed.CAS - knotToMs(this.restrictedTarget)) < .5) {
                variation = 'CONSTANT'
            } else {
                variation = 'DECELERATION'
            }
        }
        return {
            type: type,
            variation: variation
        }
    }

    computeMassVariation() {
        // console.log(this.fuelFlow)
        if (this.fuelFlow){
            // this.flightParams.mass -= this.fuelFlow / 60
        }

    }

    updateConditions() {
        this.getPhase()
        this.computeFuelFlow()
        this.computeMassVariation()
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
        let dragCoefficients = this.getDragCoefficients()
        let thrust = drag(this.atmosphereParams.airDensity, target, parseFloat(this.flightCoefficients.aerodynamics.wingSurfaceArea), 0, dragCoefficients.CD0, dragCoefficients.CD2, this.flightParams.mass)
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

    descentAtROCD(targetROCD) {
        this.updateConditions()
        let state
        let ESFValue
        let thrustToReachTarget = this.force.drag + targetROCD / this.flightParams.speed.TAS * this.flightParams.mass * Constante.g0 + this.dVTAS * this.flightParams.mass
        this.minThrust = 0
        this.force.thrust = Math.max(thrustToReachTarget, 0)
        if (thrustToReachTarget <= this.minThrust) {
            // Thrust et Vitesse limitantes
            if (Math.abs(this.flightParams.speed.TAS - CAStoTAS(this.maxSpeed, this.atmosphereParams.pressure, this.atmosphereParams.temperature)) < .5) {
                ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, 0, this.flightParams.Hp, "CONSTANT", -1)
                this.flightParams.ROCD = ROCD(this.atmosphereParams.temperature, this.force.thrust, this.force.drag, this.flightParams.speed.TAS, ESFValue, this.flightParams.mass, 0)
                let dVTAS = (1 / ESFValue - 1) * Constante.g0 / this.flightParams.speed.TAS * this.flightParams.ROCD
                this.dVTAS = dVTAS
                state = "speedLimit"
            }
            // Thrust limitant, accéleration nécessaire
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
            ESFValue = ESF(this.flightParams.speed.Mach, this.loiMontee.Mach, knotToMs(this.loiMontee.CAS), this.atmosphereParams.temperature, 0, this.flightParams.Hp, "CONSTANT", -1)
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


    updateFlightParams() {
        this.flightParams.speed.TAS += this.dVTAS
        this.distanceFromStartPoint += this.flightParams.speed.TAS * Math.sqrt(1 - (this.flightParams.ROCD / this.flightParams.speed.TAS) ** 2)
        this.flightParams.lastHp = this.flightParams.Hp
        this.flightParams.Hp += this.flightParams.ROCD
        this.flightParams.Hp = Math.max(this.flightParams.Hp, 0)
        if (this.flightParams.Hp === 0) {
            this.flightParams.ROCD = 0
        }
    }
}
