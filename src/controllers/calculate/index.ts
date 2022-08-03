import {Request, Response} from 'express'
import {error400, error500, status200} from '../../requestHTTPHandlers'
import {Operation, UniqueId} from '../../types'
import generateId from 'hans-id'
import {runChildProcess} from './childProcess'
import {getArrayData} from '../../dataHandlers/getArrayData'


export async function requestCalculate(req: Request, res: Response) {
    try {

        const {nums, texts, operation} = req.body as {nums: number[], texts: string[], operation: Operation}
        const requestId = generateId()
        runChildProcess({requestId, nums, texts, operation})
        status200(res, {data: requestId}, true)
    } catch (e) {
        error500('request calculate', res, e)
    }
}

export async function requestResult(req: Request, res: Response) {
    try {

        const {requestId} = req.params as {requestId: UniqueId}

        const results = getArrayData({folderName: 'results'})
        const result = results.find(r => r.id === requestId)

        if (result && result?.result) return status200(res, {data: result.result}, true)
        if (result && result?.error) return error400(res, result.error)

        status200(res, {data: null}, true)
    } catch (e) {
        error500('request calculate', res, e)
    }
}
