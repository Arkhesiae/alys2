import {classes} from "@/BADA/Data/classes"
import {results} from "@/BADA/Data/data"


class Plane {
    constructor(ICAO, reference, fullName, manufacturer, type,wingType,  imgUrl) {
        this.ICAO = ICAO;
        this.aircraftModel = fullName;
        this.performanceReference = reference;
        this.manufacturer = manufacturer;
        this.img = imgUrl
        this.link = ICAO;
        this.type = type
        this.wingType = wingType
    }

}


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
        acData = results.find((ac)=> ac.ICAOCode === aircraft.acID)
        formattedList.push(new Plane(
            aircraft.acID,
            aircraft.reference,
            acData?.Model,
            acData?.Manufacturer,
            acData?.Type,
            acData?.WingType,
            ""
        ))
    })
    let t2 = performance.now()
    console.log(t2 - t1)
    return formattedList
}

export let formattedList = formatData()
