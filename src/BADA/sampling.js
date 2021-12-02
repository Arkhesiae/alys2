export function profileSampling(values, size){
    let sampledValues = []
    let length = values.length
    for (let index = 0; index <= size ; index++){
        let ratio = length/size
        let valueIndex = Math.min(Math.floor(index*ratio), values.length-1)
        sampledValues.push(values[valueIndex])
    }
    return sampledValues
}



// console.log(sampling())