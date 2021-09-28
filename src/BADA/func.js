
// Definitions

import {Constante} from "@/BADA/constantes"

export function msToKnot(speed) {
    return 1.9438 * speed
}

export function knotToMs(speed) {
    return speed / 1.9438
}

export function airDensity(p, T) {
    return p / (Constante.R * T)
}

// eslint-disable-next-line no-unused-vars
export function speedOfSound(T) {
    return Math.sqrt(Constante.K * Constante.R * T)
}

export function airPressure(deltaT, Hp) {
    let T = temperature(deltaT, Hp)
    let p = Constante.p0 * ((T - deltaT) / Constante.T0) ** (-Constante.g0 / (Constante.Bt * Constante.R))
    if (Hp <= Constante.HpTrop) {
        // console.log("Sous la tropopause : ", p)
        // Sous la tropopause
        // A la tropopause
        return p
    } else {
        // Au dessus de la tropopause
        return p * Math.exp(-Constante.g0 / (Constante.R * Constante.TISAtrop) * (Hp - Constante.HpTrop))
    }
}

export function temperature(deltaT, Hp) {
    if (Hp <= Constante.HpTrop) {
        return Constante.T0 + deltaT + Constante.Bt * Hp
    } else {
        return Constante.TISAtrop + deltaT
    }
}

export function CAStoTAS(CAS, p, T) {
    let r = airDensity(p, T)
    let A = (1 + Constante.mu / 2 * Constante.r0 / Constante.p0 * CAS ** 2) ** (1 / Constante.mu) - 1
    let B = (1 + Constante.p0 / p * A) ** Constante.mu - 1
    return Math.sqrt(2 / Constante.mu * p / r * B)
}

export function TAStoCAS(TAS, p, T) {
    let r = airDensity(p, T)
    let A = (2 * Constante.p0 / Constante.mu / Constante.r0)
    let C = 1 + Constante.mu * r / p / 2 * TAS ** 2
    let B = 1 + (p / Constante.p0) * (C ** (1 / Constante.mu) - 1)
    return (A * (B ** Constante.mu - 1)) ** (1 / 2)
}

// eslint-disable-next-line no-unused-vars
export function MachtoTAS(M, T) {
    return M * Math.sqrt(Constante.K * Constante.R * T)
}

export function TAStoMach(TAS, T) {
    return TAS / Math.sqrt(Constante.K * Constante.R * T)
}


/**
 * Determine l'altitude de conjonction
 * @param CAS Calibrated airspeed [m/s]
 * @param M Mach
 * @returns {number} Altitude Pression alti transition [ft]
 */
export function HpTrans(CAS, M) {

    let A = (1 + (Constante.K - 1) / 2 * (CAS / Constante.a0) ** 2) ** (1 / Constante.mu) - 1
    let B = (1 + (Constante.K - 1) / 2 * M ** 2) ** (1 / Constante.mu) - 1
    let deltaTrans = A / B
    let DeltaTrans = deltaTrans ** (-Constante.Bt * Constante.R / Constante.g0)
    return 1000 / (0.3048 * 6.5) * Constante.T0 * (1 - DeltaTrans)
}

/**
 *
 * @param T
 * @param Thrust
 * @param Drag
 * @param TAS
 * @param ESF
 * @param m
 * @param deltaT
 * @returns {number}
 */
export function ROCD(T, Thrust, Drag, TAS, ESF, m, deltaT) {
    return ((T - deltaT) / T) * ((Thrust - Drag) * TAS / m / Constante.g0) * ESF
}

export function ESF(M, Mloi, CASloi, T, deltaT, Hp, State, Vertical) {
    switch (State) {
        case "constant":
            // CONSTANT SPEED
            if (Hp > HpTrans(CASloi, Mloi) / 3.28084) {
                console.log("un")
                //      Constant Mach Number
                //          Above Tropopause
                if (Hp > Constante.HpTrop) {
                    return 1
                }
                    //      Constant Mach Number
                //          Below Tropopause
                else {
                    return (1 + ((Constante.K * Constante.R * Constante.Bt) / (2 * Constante.g0)) * (M ** 2) * ((T - deltaT) / T)) ** (-1)
                }
            } else {
                console.log("deux")
                let A
                let B = (1 + (Constante.K - 1) / 2 * M ** 2) ** (-1 / (Constante.K - 1))
                let C = (1 + (Constante.K - 1) / 2 * M ** 2) ** (1 / Constante.mu) - 1
                //      Constant CAS
                //          Above Tropopause
                if (Hp > Constante.HpTrop) {
                    A = 0
                }
                    //      Constant CAS
                //          Below Tropopause
                else {
                    A = 1 + Constante.K * Constante.R * Constante.Bt / (2 * Constante.g0) * M ** 2 * (T - deltaT) / T
                }
                return (A + B * C) ** (-1)
            }
        case "accel":
            // ACCELERATION
            if (Vertical > 0) {
                return 0.3
            } else {
                return 1.7
            }

        case "decel":
            // DECELERATION
            if (Vertical < 0) {
                return 0.3
            } else {
                return 1.7
            }
    }
}

export function drag(rho, TAS, S, bank, CD0, CD2, m) {
    return CDragCR(CD0, CD2, m, rho, TAS, S, bank) * rho * TAS ** 2 * S / 2
}

export function CLift(m, rho, TAS, S, bank) {
    return 2 * m * Constante.g0 / (rho * TAS ** 2 * S * Math.cos(bank * Math.PI / 180))
}

export function CDragCR(CD0, CD2, m, rho, TAS, S, bank) {
    return CD0 + CD2 * CLift(m, rho, TAS, S, bank) ** 2
}

// MASS

// eslint-disable-next-line no-unused-vars
export function operatingSpeed(Vref, m, mRef) {
    return Vref * Math.sqrt(m / mRef)
}

// FLIGHT ENVELOPPE

/**
 * Fonction altitude maximale pour une masse donnée
 * @param hMo maximum operating altitude [ft] above standard MSL
 * @param hMax maximum altitude [ft] above standard MSL at MTOW under ISA
 conditions (allowing about 300 ft/min of residual rate of climb)
 * @param Gt temperature gradient on hmax [ft/K]
 * @param deltaT temperature deviation from ISA [K]
 * @param Ctc4
 * @param Gw mass gradient on hmax [ft/kg]
 * @param Mmax
 * @param Mact  actual aircraft mass [kg]
 * @returns {number}
 */
// eslint-disable-next-line no-unused-vars
export function maximumAltitude(hMo, hMax, Gt, deltaT, Ctc4, Gw, Mmax, Mact) {
    return Math.min(hMo, hMax + Gt * (deltaT - Ctc4) + Gw * (Mmax - Mact))
}

// eslint-disable-next-line no-unused-vars
export function minimumSpeed(Vstall, conf) {
    let CvMin = 1.3
    let CvMinTO = 1.2
    if (conf === "takeOff"){
        return CvMinTO * Vstall
    }
    else return CvMin * Vstall
}

export function lowSpeedBuffetting(k, Clbo, p, S, W) {
    let a1 = - Clbo / k
    let a2 = 0
    let a3 = W / S / (0.583* p * k)
    let Q = (3 * a2 - a1 ** 2) / 9
    let R = (9 * a1 * a2 - 27 * a3 - 2 * a1 ** 3) / 54
    let cosTheta = R / Math.sqrt(-(Q ** 3))
    let theta = Math.acos(cosTheta)

    let solutions = []
    let X1 = 2 * Math.sqrt(-Q) * Math.cos(theta / 3 ) - a1 / 3
    let X2 = 2 * Math.sqrt(-Q) * Math.cos(theta / 3 + 120 * Math.PI / 180) - a1 / 3
    let X3 = 2 * Math.sqrt(-Q) * Math.cos(theta / 3 + 240 * Math.PI / 180) - a1 / 3
    if (X1>0){
        solutions.push(X1)
    }
    if (X2>0){
        solutions.push(X2)
    }
    if (X3>0){
        solutions.push(X3)
    }
    // console.log(X1, X2, X3)
    return Math.min(solutions[0],solutions[1])


}

export function maxClimbTOThrust(Ctc1, Ctc2, Ctc3, Hp) {
    let HpFeet = Hp * 3.28084
    return Ctc1 * (1 - HpFeet / Ctc2 + Ctc3 * HpFeet ** 2)
}

// eslint-disable-next-line no-unused-vars
export function correctMaxClimbTOThrust(Ctc1, Ctc2, Ctc3, Ctc4, Ctc5, Hp, deltaT) {
    let deltaTeff = deltaT - Ctc4
    return maxClimbTOThrust(Ctc1, Ctc2, Ctc3, Hp) * (1 - Ctc5 * deltaTeff)
}

// eslint-disable-next-line no-unused-vars
export function maxCruiseThrust(maxClimbThrust) {
    return .95 * maxClimbThrust
}


