import {filterObjDuplicates, getSameObjects} from '../../helpers/filterDuplicates'

function parseFilterValue(value: string): any {
    if (value.includes('"')) return value.replace('"', '').replace('"', '')
    if (!Number.isNaN(+value)) return +value
    else if (value === 'true') return true
    else if (value === 'false') return false
    else if (value === 'null') return null
}

type FilterType =
    'or'
    | 'and'

type Filter = {
    keys: string[]
    value: any
}

function parseFilterQueries(filterQueries: string[]): [Filter[], FilterType] {
    if (filterQueries.length <= 1) {
        return [
            filterQueries
                .map(filterQuery => filterQuery
                    .split(/[\[\]]/)
                    .filter(el => !!el))
                .map(splitFilterQueries => ({
                    keys: splitFilterQueries,
                    value: parseFilterValue(splitFilterQueries.pop()!)
                })),
            'and'
        ]
    }
    return [
        filterQueries
            .slice(1)
            .map(filterQuery => filterQuery
                .split(/[\[\]]/)
                .filter(el => !!el))
            .map(splitFilterQueries => ({
                keys: splitFilterQueries,
                value: parseFilterValue(splitFilterQueries.pop()!)
            })),
        filterQueries[0].split(/[\[\]]/).filter(el => !!el)[0] as FilterType
    ]
}

function getItemValueByKeys(item: Record<string, any>, keys: string[]): any {
    let targetValue: any = item
    keys.forEach(key => {
        try {
            targetValue = targetValue[key]
        } catch {
            targetValue = undefined
        }
    })
    return targetValue
}

export default function filter(items: Record<string, any>[], filterQueries: string[]): Record<string, any>[] {
    const [filters, filterType] = parseFilterQueries(filterQueries)

    let filteredItemsSeparately: Record<string, any>[][] = []

    filters.forEach(filter => filteredItemsSeparately.push(items.filter(item => getItemValueByKeys(item, filter.keys) === filter.value)))

    if (filterType === 'or') {
        return filterObjDuplicates(filteredItemsSeparately.reduce((filteredItems, filteredItemsSeparatelys) => {
            return [...filteredItems, ...filteredItemsSeparatelys]
        }, []))
    } else if (filterType === 'and') return getSameObjects(filteredItemsSeparately)
    else return []
}
