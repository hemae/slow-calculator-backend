import {DatabaseFolderName} from '../configGetter'
import {jsonFileReader, jsonFilesReader} from '../fileHandlers'
import sort from '../queryHandlers/sort'
import filter from '../queryHandlers/filter'


type GetArrayDataForResponseOptions = {
    folderName: DatabaseFolderName
    sort?: string
    filters?: string[] | null
}

export function getArrayDataForResponse(options: GetArrayDataForResponseOptions): Record<string, any>[]  {
    const {
        folderName,
        sort: sortType,
        filters
    } = options

    if (filters) return sort(filter(jsonFileReader<string>(folderName)('index'), filters), sortType)
    else return sort(jsonFileReader<string>(folderName)('index'), sortType)
}

type GetArrayDataOptions = {
    folderName: DatabaseFolderName
}

export function getArrayData(options: GetArrayDataOptions): Record<string, any>[]  {
    const {
        folderName
    } = options

    return jsonFileReader<string>(folderName)('index')
}
