import {readFileSync} from 'fs'
import configGetter, {DatabaseFolderName} from '../configGetter'
import {dirReader} from './dirReader'


export function jsonFilesReader(folderName: DatabaseFolderName): Record<string, any>[] {
    return dirReader(folderName)
        .filter(fileName => fileName.includes('.json'))
        .map(fileName => JSON.parse(readFileSync(`${configGetter(folderName)}/${fileName}`, 'utf-8')))
}
