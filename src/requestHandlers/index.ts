import {Request, Response} from 'express'
import {DatabaseFolderName, DatabaseRelationFolderName} from '../configGetter'
import pagination from '../queryHandlers/pagination'
import {getArrayDataForResponse} from '../dataHandlers'
import generateId from 'hans-id'
import {jsonFileWriter} from '../fileHandlers'
import {error404, error500, status200, status201} from '../requestHTTPHandlers'
import {getArrayData} from '../dataHandlers/getArrayData'
import {getSingleForm} from '../helpers'
import {turnSnakeToCamel} from '../helpers/spelling'


export function getsData(folderName: DatabaseFolderName, relations: DatabaseFolderName[] | undefined) {
    return async function(req: Request, res: Response) {
        try {
            let {page, pageSize, sort, filters} = req.query as {
                page?: string,
                pageSize?: string,
                sort?: string,
                filters?: string | string[]
            }
            if (typeof filters === 'string') filters = [filters]

            let items = getArrayDataForResponse({folderName, sort, filters})

            // FIXME: remove from separated module
            if (relations) {
                relations.forEach(relation => {
                    const relatedItems = getArrayData({folderName: relation})
                    const relationData = getArrayData({folderName: `${folderName}-${relation}` as DatabaseRelationFolderName})
                    items = items.map(item => {
                        const relationItems = relationData.filter(r => r[getSingleForm(folderName)].id === item.id)
                        const targetRelatedItems = relatedItems.filter(relatedItem => !!relationItems.find(relationItem => relationItem[getSingleForm(turnSnakeToCamel(relation))].id === relatedItem.id))
                        return {...item, [turnSnakeToCamel(relation)]: targetRelatedItems}
                    })
                })
            }

            status200(res, pagination(page, pageSize, items), true)
        } catch (e: any) {
            error500(`gets data ${folderName}`, res, e)
        }
    }
}

export function getData(folderName: DatabaseFolderName, relations: DatabaseFolderName[] | undefined) {
    return async function(req: Request, res: Response) {
        try {
            const {id} = req.params
            let items = getArrayData({folderName})

            // FIXME: remove from separated module
            if (relations) {
                relations.forEach(relation => {
                    const relatedItems = getArrayData({folderName: relation})
                    const relationData = getArrayData({folderName: `${folderName}-${relation}` as DatabaseRelationFolderName})
                    items = items.map(item => {
                        const relationItems = relationData.filter(r => r[getSingleForm(folderName)].id === item.id)
                        const targetRelatedItems = relatedItems.filter(relatedItem => !!relationItems.find(relationItem => relationItem[getSingleForm(turnSnakeToCamel(relation))].id === relatedItem.id))
                        return {...item, [turnSnakeToCamel(relation)]: targetRelatedItems}
                    })
                })
            }

            const item = items.find(s => s.id === id)
            if (!item) return error404(res)

            status200(res, item)
        } catch (e: any) {
            error500(`get data ${folderName}`, res, e)
        }
    }
}

export function postData(folderName: DatabaseFolderName, relations: DatabaseFolderName[] | undefined) {
    return async function(req: Request, res: Response) {
        try {
            const {data} = req.body
            data['id'] = generateId()
            data['createdAt'] = new Date().toISOString()
            data['updatedAt'] = new Date().toISOString()

            const items = getArrayData({folderName})
            items.push(data)

            jsonFileWriter<string>({
                fileName: 'index',
                folderName: folderName,
                data: items
            })
            status201(res, data)
        } catch (e) {
            error500(`post data ${folderName}`, res, e)
        }
    }
}

export function putData(folderName: DatabaseFolderName, relations: DatabaseFolderName[] | undefined) {
    return async function(req: Request, res: Response) {
        try {
            const {id} = req.params
            const {data} = req.body
            data['updatedAt'] = new Date().toISOString()

            let items = getArrayData({folderName})
            let item = items.find(i => i.id === id)

            if (item) {
                item = {...item, ...data}
                //@ts-ignore
                items = items.map(i => i.id !== id ? i : item)
                jsonFileWriter<string>({
                    fileName: 'index',
                    folderName: folderName,
                    data: items
                })
            } else return error404(res)

            //@ts-ignore
            status200(res, item)
        } catch (e) {
            error500(`put data ${folderName}`, res, e)
        }
    }
}

export function deleteData(folderName: DatabaseFolderName, relations: DatabaseFolderName[] | undefined) {
    return async function(req: Request, res: Response) {
        try {
            const {id} = req.params

            let items = getArrayData({folderName})
            const item = items.find(i => i.id === id)

            if (item) {
                items = items.filter(i => i.id !== id)
                jsonFileWriter<string>({
                    fileName: 'index',
                    folderName: folderName,
                    data: items
                })
            } else return error404(res)

            status200(res, item)
        } catch (e) {
            error500(`delete data ${folderName}`, res, e)
        }
    }
}

