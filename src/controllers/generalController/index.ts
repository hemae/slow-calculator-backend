import {error500} from '../../requestHTTPHandlers'
import {Controller, Controllers, GControllerType, HandlerType} from './types'
import {DatabaseFolderName} from '../../configGetter'
import {deleteData, getData, getsData, postData, putData} from '../../requestHandlers'
export {
    HandlerType,
    GControllerType,
    Controller
} from './types'



export const controller = (handler: HandlerType): HandlerType => async (req, res) => {
    try {return await handler(req, res)} catch (e) {error500('general controller', res, e)}
}


export function getControllers(folderName: DatabaseFolderName, relations?: DatabaseFolderName[]): Controllers {
    return {
        gets: controller(getsData(folderName, relations)),
        get: controller(getData(folderName, relations)),
        post: controller(postData(folderName, relations)),
        put: controller(putData(folderName, relations)),
        delete: controller(deleteData(folderName, relations))
    }
}
