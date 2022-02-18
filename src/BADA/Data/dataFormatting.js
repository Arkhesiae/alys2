import {classes} from "@/BADA/Data/classes"
import {results} from "@/BADA/Data/data"
import {coef} from "@/BADA/Data/coefficients"
// import {ref} from "vue"


class Plane {
    constructor(ICAO, reference, fullName, manufacturer, type,wingType, wakeTurbulence, engine, engineNumber, imgUrl) {
        this.ICAO = ICAO;
        this.reference = reference
        this.aircraftModel = fullName;
        this.engineType = engine
        this.engineNumber = engineNumber
        this.wakeTurbulence = wakeTurbulence
        this.performanceReference = reference;
        this.manufacturer = manufacturer;
        this.img = imgUrl
        this.link = ICAO;
        this.type = type
        this.wingType = wingType
    }

}

export let Manufacturers = ['Antonov', 'Airbus', 'China Commercial Aircraft', 'Ilyushin', 'De Havilland Aircraft of Canada', 'Indonesian Aerospace', 'Aerospatiale', 'Nihon Aircraft Manufacturing Corporation', 'Convair', 'British Aerospace', 'Beechcraft', 'Boeing', 'McDonnell Douglas', 'Embraer', 'British Aircraft Corporation', 'Grumman', 'Vulcanair', 'Beriev Aircraft Company', 'Short Brothers', 'Lockheed Corporation', 'Cessna', 'Tecnam', 'Avions Robin', 'TL Ultralight', 'Piper Aircraft', 'Aeroprakt', 'Government Aircraft Factories', 'Harbin Aircraft Industry Group', 'Gulfstream', 'Bombardier', 'Dornier Luftfahrt', 'Aquila', 'Diamond Aircraft Industries', 'Britten-Norman', 'Pipistrel', 'Team Rocket', 'Champion Aircraft Corporation', 'Evektor-Aerotechnik', 'Fokker', 'Avro International Aerospace', 'Curtiss-Wright', 'Dassault Falcon', 'Hawker Beechcraft Corporation', 'Honda', 'Pilatus Aircraft', 'Let Kunovice', 'Learjet', 'ICON', 'Mitsubishi', 'Piaggio Aero', 'GippsAero', 'Junkers', 'Saab', 'Israel Aircraft Industries', 'Cirrus', 'Sukhoi', 'Tupolev', 'Socata', 'Yakovlev']

export function formatData(){
    // let date = new Date()
    let t1 = performance.now()
    let formattedList = []
    let aircraftList = []
    for (let cls of classes) {
        if (Array.isArray(cls.synonymACTypes)) {
            cls.synonymACTypes.forEach((synonym) => {
                aircraftList.push({acID : synonym, reference : cls.referenceACType})
            })
        } else {
            aircraftList.push({acID : cls.synonymACTypes, reference : cls.referenceACType})
        }
    }
    aircraftList.forEach((aircraft)=>{
        let acData = ""
        let acCoef = ""
        acData = results.find((ac)=> ac.ICAOCode === aircraft.acID)
        // console.log(aircraftList)
        acCoef = coef.aircraftPerformances.find((ac)=> ac.aircraftType === aircraft.reference)?.acTypeData
        // if (!Manufacturers.includes(acData?.Manufacturer)){
        //     Manufacturers.push(acData?.Manufacturer)
        // }
        formattedList.push(new Plane(
            aircraft.acID,
            aircraft.reference,
            acData?.Model,
            acData?.Manufacturer,
            acData?.Type,
            acData?.WingType,
            acCoef?.wakeTurbulenceCategory,
            acCoef?.engineType,
            acCoef?.numberOfEngines,
            ""
        ))
    })
    let t2 = performance.now()
    console.log(t2 - t1)
    return formattedList
}

export let formattedList = formatData()

console.log(formattedList)
