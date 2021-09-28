export class Constante {
    // Standard atmospheric temperature at MSL
    static T0 = 288.15 //K
    // Standard atmospheric pressure at MSL
    static p0 = 101325 //Pa
    // Standard atmospheric density at MSL:
    static r0 = 1.225 //kg/m3
    // Speed of sound
    static a0 = 340.294 //m/s
    // Altitude Tropopause
    static HpTrop = 11000 //m
    // Adiabatic index of air
    static K = 1.4
    // Coefficient
    static mu = (this.K - 1) / this.K
    // Real gas constant for air
    static R = 287.05287 // m²/(K·s²)
    // Gravitational acceleration
    static g0 = 9.80665 // m/s²
    // ISA temperature gradient with altitude below the tropopause
    static Bt = -0.0065 // K/m
    // ISA temperature at tropopause
    static TISAtrop = this.T0 + this.Bt * this.HpTrop
}