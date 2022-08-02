
type Returned<ItemType> = {
    meta: {
        page: number
        pageSize: number
        pageCount: number
        total: number
    }
    data: ItemType[]
}

export default function pagination<ItemType>(page: string | undefined, pageSize: string | undefined, items: ItemType[]): Returned<ItemType> {
    return {
        data: items.slice((+(page || 1) - 1) * +(pageSize || 10), +(page || 1) * +(pageSize || 10)),
        meta: {
            page: +(page || 1),
            pageSize: +(pageSize || 10),
            pageCount: Math.ceil(items.length / +(pageSize || 10)),
            total: items.length
        }
    }
}
