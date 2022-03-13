// import {createCharts} from "./charts.js"
import {PhysicalPlane} from "./physicalPlane.js"
import {knotToMs, msToKnot} from "@/BADA/Misc/func"


const altitudeGraph = document.getElementById('altitude')?.getContext('2d');
const speedGraph = document.getElementById('speed')?.getContext('2d');
const forceGraph = document.getElementById('force')?.getContext('2d');
const ROCDGraph = document.getElementById('ROCD')?.getContext('2d');
const machGraph = document.getElementById('mach')?.getContext('2d');

// eslint-disable-next-line no-unused-vars
let dataSets = {
    time: {
        data: [],
    },
    altitude: {
        data: [],
        graph: altitudeGraph,
    },
    mach: {
        data: {
            mach: [],
            buffet: [],
            maxMach: [],
        },
        graph: machGraph,
    },
    ROCD: {
        data: [],
        graph: ROCDGraph,
    },
    speed: {
        data: {
            CAS: [],
            TAS: [],
        },
        graph: speedGraph,
    },

    force: {
        data: {
            thrust: [],
            drag: [],
            maxThrust: [],
        },
        graph: forceGraph,
    },
}

// let plane = new PhysicalPlane()
// plane.setParameters(54000)
// plane.setInitialState(255*100/3.28084, 111, 0, 0)
// plane.loiChelou(msToKnot(111))
// for (let x=0; x<120; x ++){
//     plane.monteeCASConstant()
//     console.log("CAS : ", plane.flightParams.speed.CAS, " FL : ",plane.flightParams.Hp*3.28084/100, " ROCD : ", plane.flightParams.ROCD*197, " %T : " , plane.force.thrust/plane.maxThrust)
// }
//
// plane.setInitialState(255*100/3.28084, 111, 0, 0)
// for (let x=0; x<280; x ++){
//     plane.climbAtROCD(2276/197)
//     console.log("CAS : ", plane.flightParams.speed.CAS, " FL : ",plane.flightParams.Hp*3.28084/100, " ROCD : ", plane.flightParams.ROCD*197, " %T : " , plane.force.thrust/plane.maxThrust)
// }


export function calcPerf(FL, loi, speedv, coef) {
    let plane = new PhysicalPlane(coef)
    console.log("ey")
    plane.setParameters(80)
    // plane.setInitialState(FL * 100 / 3.28084, knotToMs(250), 0, 0)
    // let minSpeed = msToKnot(plane.minSpeed)
    // let maxSpeed = msToKnot(plane.maxSpeed)
    // let maxROCD = 0
    plane.setInitialState((FL) * 100 / 3.28084, knotToMs(speedv), 0, 0)
    plane.climbInstruction(660, '', '', 'CONSTANT')
    plane.flyLoop()
    plane.flyLoop()
    plane.flyLoop()
    plane.flyLoop()
    // if (loi) {
    //     plane.setInitialState(FL * 100 / 3.28084, knotToMs(loi.speed), 0, 0)
    //     plane.setLoiMontee(loi.speed, loi.mach)
    //     plane.climbInstruction('', '', '', 'CONSTANT')
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //     // plane.flyLoop()
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //     maxROCD = plane.flightParams.ROCD
    //     return {rate: Math.floor(maxROCD * 196.85039 / 100) * 100, speed: '', maxFL: '', absoluteMaxFL: ''}
    // } else {
    //     let speedY = minSpeed
    //     console.warn('c parti')
    //     for (let speed = minSpeed; speed < maxSpeed; speed++) {
    //
    //         //console.warn("AVANT")
    //         //console.log("CAS : ", plane.flightParams.speed.CAS, " FL : ",plane.flightParams.Hp*3.28084/100, " ROCD : ", plane.flightParams.ROCD*197, " %T : " , plane.force.thrust/plane.maxThrust)
    //         plane.loiChelou(speedv)
    //         //plane.monteeCASConstant()
    //         //console.log("CAS : ", plane.flightParams.speed.CAS, " FL : ",plane.flightParams.Hp*3.28084/100, " ROCD : ", plane.flightParams.ROCD*197, " %T : " , plane.force.thrust/plane.maxThrust)
    //         plane.climbInstruction('', '', '', 'CONSTANT')
    //         plane.flyLoop()
    //         //console.warn("APRES")
    //         // console.log("CAS : ", plane.flightParams.speed.CAS, " FL : ",plane.flightParams.Hp*3.28084/100, " ROCD : ", plane.flightParams.ROCD*197, " %T : " , plane.force.thrust/plane.maxThrust)
    //
    //         //console.log(speed, plane.flightParams.ROCD*197)
    //         if (plane.flightParams.ROCD > maxROCD) {
    //             maxROCD = plane.flightParams.ROCD
    //             speedY = speed
    //         }
    //     }
    //
    //
    //     // plane.setInitialState((FL - 5) * 100 / 3.28084, knotToMs(speed), 0, 0)
    //     // plane.loiChelou(speed, 0.78)
    //     // let maxThrustFL
    //     // let minSpeedFL
    //     //
    //     // for (let x = 0; x < 0; x++) {
    //     //     //   console.log("%Poussée : ", plane.force.thrust/plane.maxThrust)
    //     //     let limit = plane.climbAtROCD(maxROCD)
    //     //     //console.log("CAS : ", plane.flightParams.speed.CAS, " FL : ",plane.flightParams.Hp*3.28084/100, " ROCD : ", plane.flightParams.ROCD*197, " %T : " , plane.force.thrust/plane.maxThrust)
    //     //     // console.log("%Poussée : ", plane.force.thrust/plane.maxThrust)
    //     //     // console.log(limit)
    //     //     // console.log(plane.flightParams.Hp)
    //     //     if (limit === "thrustLimit" && !maxThrustFL) {
    //     //         maxThrustFL = Math.floor(plane.flightParams.Hp * 3.28084 / 100)
    //     //         // console.log("Niveau max poussée : ",maxThrustFL)
    //     //
    //     //     } else if (limit === "speedLimit") {
    //     //         minSpeedFL = Math.floor(plane.flightParams.Hp * 3.28084 / 100)
    //     //         // console.log("Niveau max vitesse : ",maxThrustFL)
    //     //         // console.log(x)
    //     //         break
    //     //     }
    //     // }
    //     // plane.setInitialState((FL) * 100 / 3.28084, knotToMs(speed), 0, 0)
    //     // plane.loiChelou(speed, 0.78)
    //     // plane.climbInstruction('', '', '', 'CONSTANT')
    //
    //
    //     // plane.flyLoop()
    //
    //
    //
    //
    // }
    return {
        rate: Math.floor(plane.flightParams.ROCD * 196.85039 / 100) * 100,
        // speed: speedY,
        maxFL: '',
        // absoluteMaxFL: minSpeedFL
    }
    // let FLreturn = 0

    // console.log("MinSpeed : ", msToKnot(plane.minSpeed))
    // console.log("MaxSpeed : ", msToKnot(plane.maxSpeed))


    // console.log(maxThrustFL, minSpeedFL)
    // for (let fl=FL; fl<490; fl++){
    //
    //     plane.computeSpeed()
    //     console.log("buffeting : ", plane.lowSpeedBuffetingLimit)
    //     console.log("mach at FL ", fl," : ",plane.flightParams.speed.Mach)
    //     if (plane.lowSpeedBuffetingLimit>plane.flightParams.speed.Mach){
    //         FLreturn=fl
    //         break
    //     }
    // }

    // console.log(speedY)

}


export function maxFLAtROCD(FL, speed, loi, ROCD, coef) {
    let plane = new PhysicalPlane(coef)
    plane.setParameters(54000)
    plane.setInitialState((FL - 5) * 100 / 3.28084, knotToMs(speed), 0, 0)
    // console.log(FL, speed)

    plane.setLoiMontee(loi.speed, loi.mach)
    let maxThrustFL
    plane.climbInstruction('', '', ROCD * 197, '')
    for (let x = 0; x < 4000; x++) {




        // plane.flyLoop()




        //   console.log("%Poussée : ", plane.force.thrust/plane.maxThrust)
        let limit = plane.ROCDLimit
        // console.log(limit)
        // console.log("CAS : ", plane.flightParams.speed.CAS, " FL : ",plane.flightParams.Hp*3.28084/100, " ROCD : ", plane.flightParams.ROCD*197, " %T : " , plane.force.thrust/plane.maxThrust)
        if (limit === "thrustLimit" && !maxThrustFL) {
            maxThrustFL = Math.floor(plane.flightParams.Hp * 3.28084 / 100)
            console.log(x)
            break
        }
        if (plane.flightParams.Hp * 3.28084 / 100 > 410) {
            console.log(x)
            maxThrustFL = 410
            break
        }
        // else if (limit === "speedLimit"){
        //     minSpeedFL = Math.floor(plane.flightParams.Hp*3.28084/100)
        //     // console.log("Niveau max vitesse : ",maxThrustFL)
        //     // console.log(x)
        //     break
        // }
    }
    return maxThrustFL
}

export function specificRange(coef){
    let plane = new PhysicalPlane(coef)
    plane.setParameters(80)

    for (let FL = 260; FL<430 ; FL += 20){
        console.log(plane.flightParams.mass/plane.force.drag)
        for (let mach = 0.70 ; mach < 0.84 ; mach += 0.02){
            plane.setInitialState((FL) * 100 / 3.28084, "", 0, 0, mach)
            plane.levelInstruction(10)
            plane.flyLoop()
            plane.updateConditions()

        }
    }


}




export function flightProfile(climbSequence, cruiseSequence, descentSequence, law, coefficients, defaultSpeeds, mass) {
    let fullSequence = {
        climb : climbSequence,
        cruise : cruiseSequence,
        descent : descentSequence,
    }

    if(!climbSequence){
        return
    }

    specificRange(coefficients)
    let plane = new PhysicalPlane(coefficients, defaultSpeeds)

    if (law){
        plane.setLoiMontee(law.speed, law.mach)
    } else plane.setLoiMontee(parseFloat(defaultSpeeds.climb.highAltitudeClimbSpeed.averageMassSpeed), parseFloat(defaultSpeeds.climb.standardClimbMachNumber.averageMassMach))

    plane.setInitialState(0, 0, 1, 0)

    if (mass){
        plane.setMass(mass)
    } else plane.setParameters(85)

    let profile = {
        climb : [],
        cruise : [],
        descent : [],
        full : [],
    }
    let index = 0
    let X = 0



    Object.keys(fullSequence).forEach((sequence)=>{

        let currentSequence = fullSequence[sequence]

        for (let instruction of currentSequence){
            if (plane.idleState) {
                X = 0
                let current = instruction
                if (current.type === 'climb'){
                    plane.getTargetInstruction(current.FLTarget, current.time, '', current.speedInstruction)
                }
                else if (current.type === 'level'){
                    plane.getTargetInstruction(current.FLTarget, current.time, '', current.speedInstruction)
                }
                else if (current.type === 'descent'){
                    plane.getTargetInstruction(current.FLTarget, current.time, '', current.speedInstruction)
                }
            }
            while (!plane.idleState) {
                X ++
                if (X>50000){
                    console.log('FIN')
                    break
                }
                plane.flyLoop()
                // console.log('IDLE STATE : ',plane.idleState)
                let profilePoint = {
                    index : index,
                    speed : Math.round(msToKnot(plane.flightParams.speed.CAS)),
                    speedTAS : Math.round(msToKnot(plane.flightParams.speed.TAS)),
                    mach : plane.flightParams.speed.Mach,
                    rate : Math.round(plane.flightParams.ROCD*197/10)*10,
                    alt : plane.flightParams.Hp*3.28084/100,
                    maxAlt : plane.flightEnvelope.maxAlt/100,
                    intercept : plane.INTERCEPTION,
                    altIntcpt : plane.altIntcpt,
                    targetFL : plane.targetFL,
                    targetSpeed : plane.targetSpeed,
                    restrictedTarget : plane.restrictedTarget,
                    speedVariation : plane.speedVariation,
                    flightPhase : plane.flightPhase,
                    dist : plane.distanceFromStartPoint,
                    hpTrans : plane.loiMontee.HpTrans,
                    SAT : plane.atmosphereParams.temperature,
                    atmPressure : plane.atmosphereParams.pressure,
                    phase : sequence,
                    h: plane.currenth,
                    force: plane.force.thrust,
                    masse: plane.flightParams.mass,
                    ESF : plane.ESF,
                    buffetingMach: plane.lowSpeedBuffetingLimit,
                    minSpeed: plane.minSpeed,
                    maxSpeed: parseFloat(plane.flightCoefficients.aircraftFlightEnvelope.maxOperatingSpeed)/10,
                    maxMach: parseFloat(plane.flightCoefficients.aircraftFlightEnvelope.maxOperatingMachNumber)
                }
                index++
                profile[sequence].push(profilePoint)
                profile.full.push(profilePoint)
                // console.log("FUEL FLOW : ", plane.fuelFlow)
                // console.log("MASS : ", plane.flightParams.mass)
                // console.log("CAS : ", plane.flightParams.speed.CAS, " FL : ",plane.flightParams.Hp*3.28084/100, " ROCD : ", plane.flightParams.ROCD*197, " %T : " , plane.force.thrust/plane.maxThrust)
            }
        }
    })
    return profile
}



export function calcPerfbis(FL, loi, speed, coef) {
    let plane = new PhysicalPlane(coef)
    console.log('hey')
    plane.setParameters(54000)
    plane.setInitialState(FL * 100 / 3.28084, knotToMs(250), 0, 0)

    let maxROCD = 0
    if (loi) {
        plane.setInitialState(FL * 100 / 3.28084, knotToMs(speed), 0, 0)
        plane.setLoiMontee(loi.speed, loi.mach)
        plane.descentInstruction('', '', '', 'CONSTANT')










        // plane.flyLoop()









        maxROCD = plane.flightParams.ROCD
        return {rate: Math.floor(maxROCD * 196.85039 / 100) * 100, speed: '', maxFL: '', absoluteMaxFL: ''}
    }

}

export function getPlaneMach(FL, CAS, coef) {
    let plane = new PhysicalPlane(coef)
    plane.setParameters(54000)
    plane.setInitialState(FL * 100 / 3.28084, knotToMs(CAS), 0, 0)
    return plane.flightParams.speed.Mach
}

// eslint-disable-next-line no-unused-vars
export function speedRange(FL, coef) {
    let plane = new PhysicalPlane(coef)
    plane.setParameters(85)
    plane.setInitialState(FL * 100 / 3.28084, knotToMs(250), 0, 0)
    let minSpeed = plane.minSpeed
    let maxSpeed = plane.maxSpeed
    // let unit = FL>=290 ? " M": ' kts'
    // if (FL < 290) {
    //     // eslint-disable-next-line no-unused-vars
    //     minSpeed = Math.floor(msToKnot(minSpeed))
    //     maxSpeed = Math.floor(msToKnot(maxSpeed))
    // } else {
    //     minSpeed = Math.round(TAStoMach(CAStoTAS(minSpeed, plane.atmosphereParams.pressure, plane.atmosphereParams.temperature), plane.atmosphereParams.temperature) * 100) / 100
    //     maxSpeed = Math.round(TAStoMach(CAStoTAS(maxSpeed, plane.atmosphereParams.pressure, plane.atmosphereParams.temperature), plane.atmosphereParams.temperature) * 100) / 100
    // }
    return {minSpeed: msToKnot(minSpeed), maxSpeed: msToKnot(maxSpeed)}
}

export function getAtmParams(FL, coef){
    let plane = new PhysicalPlane(coef)
    plane.setParameters(85)
    plane.setInitialState(FL * 100 / 3.28084, knotToMs(250), 0, 0)
    return {pressure : plane.atmosphereParams.pressure, temperature: plane.atmosphereParams.temperature}
}

export function range(FL, coef) {
    let plane = new PhysicalPlane(coef)
    plane.setParameters(54000)
    plane.setInitialState(FL * 100 / 3.28084, knotToMs(250), 0, 0)
    let minSpeed = plane.minSpeed
    let maxSpeed = plane.maxSpeed
    // let unit = FL>=290 ? " M": ' kts'

    // eslint-disable-next-line no-unused-vars
    minSpeed = Math.floor(msToKnot(minSpeed))
    maxSpeed = Math.floor(msToKnot(maxSpeed))


    return {minSpeed: minSpeed, maxSpeed: maxSpeed}
}

// let plane = new PhysicalPlane()
// plane.setParameters(68000)
// plane.setInitialState(8000, knotToMs(280), 0, 0)
// plane.setLoi(280, 0.78)
//
// let currentTime = 0
// let initialTime = 0
// let finalTime = 500
// // let timeLoop
// let increment = 1
// for (let time = initialTime ; time<=finalTime ; time+=increment){
//     currentTime++
//     if (time<100){
//         plane.monteeCASConstant()
//     } else if (time<600){
//         // plane.accel()
//     } else {
//         plane.palier()
//     }
//
//     dataSets.time.data.push(currentTime)
//     dataSets.altitude.data.push(Math.floor(plane.flightParams.Hp*3.28084))
//     dataSets.speed.data.CAS.push(msToKnot(plane.flightParams.speed.CAS))
//     dataSets.speed.data.TAS.push(msToKnot(plane.flightParams.speed.TAS))
//     dataSets.ROCD.data.push(plane.flightParams.ROCD*196.85)
//     dataSets.force.data.thrust.push(plane.force.thrust)
//     dataSets.force.data.drag.push(plane.force.drag)
//     dataSets.force.data.maxThrust.push(plane.maxThrust)
//     dataSets.mach.data.buffet.push(plane.lowSpeedBuffetingLimit)
//     dataSets.mach.data.mach.push(plane.flightParams.speed.Mach)
//     dataSets.mach.data.maxMach.push(plane.maxMach)
// }

// let charts = createCharts(dataSets)
// function addAllData(){
//     charts[0].chart.data.labels.push(currentTime)
//     charts.forEach((chart)=>{
//
//         switch (chart.label){
//             case "altitude":
//                 addData(chart.chart, currentTime, Math.floor(plane.flightParams.Hp*3.28084))
//                 break
//             case "mach":
//                 addData(chart.chart, currentTime, {mach:plane.flightParams.speed.Mach, buffet :plane.lowSpeedBuffetingLimit, maxMach: plane.maxMach})
//                 break
//             case "speed":
//                 addData(chart.chart, currentTime, {CAS:msToKnot(plane.flightParams.speed.CAS), TAS: msToKnot(plane.flightParams.speed.TAS)})
//                 break
//             case "ROCD":
//                 addData(chart.chart, currentTime, Math.floor(plane.flightParams.ROCD*196.85))
//                 break
//             case "force":
//                 addData(chart.chart, currentTime, {thrust: plane.force.thrust, drag : plane.force.drag, maxThrust: plane.maxThrust})
//         }
//     })
// }

// function timeLoopFunc(func){
//     clearInterval(timeLoop)
//     timeLoop = setInterval(()=>{
//         addAllData()
//         currentTime++
//         func()
//         // charts.forEach((chart)=>{
//         //     chart.chart.update()
//         // })
//         charts.forEach((chart)=>{
//             chart.chart.update()
//         })
//     },500)
// }

// function pressButton(button, func, input){
//     button.addEventListener("click", function(){
//         let inputValue = input.value
//         for (let time = 0 ; time<=inputValue ; time++){
//             func()
//             currentTime++
//             addAllData()
//         }
//         timeLoopFunc(func)
//         charts.forEach((chart)=>{
//             chart.chart.update()
//         })
//     })
// }

// let climbButtonVitesse = document.getElementById("button-montee-vitesse")
// let climbButtonAcc = document.getElementById("button-montee-acc")
// let climbButtonDec = document.getElementById("button-montee-dec")
// let climbButtonROCD = document.getElementById("button-montee-ROCD")
// let descentButtonROCD = document.getElementById("button-descent-ROCD")
// let descentButtonVitesse = document.getElementById("button-descent-vitesse")
// let descentButtonAcc = document.getElementById("button-descent-acc")
// let descentButtonDec = document.getElementById("button-descent-dec")
// let climbInput = document.getElementById("climbInput")
// let descentInput = document.getElementById("inputTempsDescent")

// pressButton(climbButtonVitesse, plane.monteeCASConstant.bind(plane), climbInput)
// pressButton(climbButtonAcc, plane.monteeAccel.bind(plane), climbInput)
// pressButton(climbButtonDec, plane.monteeDecel.bind(plane), climbInput)
// pressButton(descentButtonVitesse, plane.desCASConstant.bind(plane), descentInput)
// pressButton(descentButtonAcc, plane.descentAccel.bind(plane), descentInput)
// pressButton(descentButtonDec, plane.descentDecel.bind(plane), descentInput)

// climbButtonROCD.addEventListener("click", function(){
//     let input = climbInput.value
//     let targetROCD = document.getElementById("ROCDCLBtgt").value*0.00508
//     for (let time = 0 ; time<=input ; time++){
//         plane.climbAtROCD(targetROCD)
//         currentTime++
//         addAllData()
//     }
//     charts.forEach((chart)=>{
//         chart.chart.update()
//     })
// })
//
// descentButtonROCD.addEventListener("click", function(){
//     let input = document.getElementById("inputTempsDescent").value
//     let targetROCD = document.getElementById("ROCDCLBtgt").value*0.00508
//     for (let time = 0 ; time<=input ; time++){
//         plane.descentAtROCD(targetROCD)
//         currentTime++
//         addAllData()
//     }
//     charts.forEach((chart)=>{
//         chart.chart.update()
//     })
// })
//
// function addData(chart, label, data) {
//     if (chart.data.datasets.length>1){
//         chart.data.datasets.forEach((dataset) => {
//             dataset.data.push(data[dataset.label]);
//         });
//     }
//     else{
//         chart.data.datasets[0].data.push(data)
//     }
// }