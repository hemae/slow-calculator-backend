import {execFile} from 'child_process'
import {calculateResult} from '../../helpers/calculateResult'
import {Operation, UniqueId} from '../../types'
import {getArrayData} from '../../dataHandlers/getArrayData'
import {jsonFileWriter} from '../../fileHandlers'


type Options = {
    requestId: UniqueId
    nums: number[]
    texts: string[]
    operation: Operation
}

export function runChildProcess(options: Options): void {

    const {requestId, nums, texts, operation} = options

    execFile(__dirname + '/start.sh', [calculateResult({nums, operation}).toString(), texts.join(' ')], (error, stdout, stderr) => {

        const result: {
            id: UniqueId
            result: string | null
            error: string | null
            createdAt: string
            updatedAt: string
        } = {
            id: requestId,
            result: null,
            error: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        const results = getArrayData({folderName: 'results'})

        if (error) {
            result['error'] = error.message
            results.push(result)
            jsonFileWriter<string>({
                folderName: 'results',
                fileName: 'index',
                data: results
            })
            return
        }

        if (stderr) {
            result['error'] = stderr
            results.push(result)
            jsonFileWriter<string>({
                folderName: 'results',
                fileName: 'index',
                data: results
            })
            return
        }

        result['result'] = stdout
        results.push(result)
        jsonFileWriter<string>({
            folderName: 'results',
            fileName: 'index',
            data: results
        })
    })
}
