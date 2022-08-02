import {compareObjects} from './compareObjects'


export function filterObjDuplicates(items: Record<string, any>[]): Record<string, any>[] {
    //@ts-ignore
    return items.reduce((uniques, item) => {
        //@ts-ignore
        if (uniques.find(unique => compareObjects(unique, item))) return uniques
        //@ts-ignore
        return [...uniques, item]
    }, [] as Record<string, any>[])
}

export function getSameObjects(items: Record<string, any>[][]): Record<string, any>[] {
    //@ts-ignore
    return items[0].reduce((sameObjects, item) => {
        const isPush = items.slice(1)
            .every(itemArray => !!itemArray.find(internalItem => compareObjects(item, internalItem)))
        //@ts-ignore
        if (isPush) return [...sameObjects, item]
        else return sameObjects
    }, [] as Record<string, any>[])
}
