import configGetter, {DatabaseFolderName} from '../configGetter'
import {dirReader} from './dirReader'
import {readFileSync} from 'fs'


export function jsonReadFilesInRecord(folderName: DatabaseFolderName, locale: string, isFull: boolean): Record<string, any> {
    let returned = {} as Record<string, any>
    dirReader(folderName).forEach(fileName => {
        let content
        if (isFull) content = JSON.parse(readFileSync(`${configGetter(folderName)}/${fileName}`, 'utf-8'))
        else {
            content = JSON.parse(readFileSync(`${configGetter(folderName)}/${fileName}`, 'utf-8'))
            if (content.data) {
                if (content.data[locale]) content.data = content.data[locale]
                else if (content.data.ru) content.data = content.data.ru
            }
        }
        returned[fileName.split('.')[0]] = content
    })
    return returned
}
