export default function compareArrays(arr1: any[], arr2: any[]): boolean {
    let returned = true

    if (arr1.length !== arr1.length) return false

    arr1.forEach((el, index) => {
        if (typeof el !== typeof arr2[index]) returned = returned && false
    })

    if (!returned) {
        return false
    }

    arr1.forEach((el, index) => {
        if (typeof el === 'object') {
            if (Array.isArray(el)) returned = returned && compareArrays(el, arr2[index])
            else if (el === null) returned = returned && (el === arr2[index])
            else returned = returned && compareObjects(el, arr2[index])
        } else if (!~arr2.indexOf(el)) returned = returned && false
    })

    return returned
}

export function compareObjects(obj1: object, obj2: object): boolean {
    let returned = true

    const obj1Keys = Object.keys(obj1)
    const obj2Keys = Object.keys(obj2)

    if (!compareArrays(obj1Keys, obj2Keys)) return false

    obj1Keys.forEach(key => {
        //@ts-ignore
        if (typeof obj1[key] !== typeof obj2[key]) returned = returned && false
    })

    if (!returned) return false

    obj1Keys.forEach(key => {
        //@ts-ignore
        if (typeof obj1[key] === 'object') {
            //@ts-ignore
            if (Array.isArray(obj1[key])) {
                //@ts-ignore
                returned = returned && compareArrays(obj1[key], obj2[key])
                //@ts-ignore
            } else if (obj1[key] === null) {
                //@ts-ignore
                returned = returned && (obj1[key] === obj2[key])
            } else {
                //@ts-ignore
                returned = returned && compareObjects(obj1[key], obj2[key])
            }
        } else {
            //@ts-ignore
            returned = returned && (obj1[key] === obj2[key])
        }
    })

    return returned
}
