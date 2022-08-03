import {Method, MyMethod} from '../controllers/dataController/types'
import {Path} from './types'


export function getMethodAndPath(myMethod: MyMethod, target: string = '/:id'): [Method, Path] {

    let method: Method
    let path: Path

    switch (myMethod) {
        case 'gets':
            method = 'get'
            path = '/'
            break
        case 'get':
            method = 'get'
            path = target
            break
        case 'post':
            method = 'post'
            path = '/'
            break
        case 'put':
            method = 'put'
            path = target
            break
        default:
            method = 'delete'
            path = target
    }


    return [method, path]
}

export function getStringResourcesMethodAndPath(myMethod: MyMethod, target: string = '/:target'): [Method, Path] {

    let method: Method
    let path: Path

    switch (myMethod) {
        case 'gets':
            method = 'get'
            path = '/'
            break
        case 'get':
            method = 'get'
            path = target
            break
        default:
            method = 'put'
            path = target
    }


    return [method, path]
}
