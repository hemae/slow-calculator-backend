type SortType = 'asc' | 'desc'


export default function sort(items: Record<string, any>[], sort: string = 'createdAt:asc'): Record<string, any>[] {
    const [sortType, sortKind] = sort.split(':') as [string, SortType]
    const sortCriteria = sortType === 'asc' ? 1 : -1
    return items.sort((item1, item2) => {
        if (item1[sortKind] > item2[sortKind]) return sortCriteria
        else if (item1[sortKind] < item2[sortKind]) return -sortCriteria
        else return 0
    })
}
