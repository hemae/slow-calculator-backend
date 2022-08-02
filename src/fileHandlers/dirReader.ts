import {readdirSync} from 'fs'
import configGetter, {FolderName} from '../configGetter'


export function dirReader(dirPath: FolderName): string[] {
    return readdirSync(configGetter(dirPath) as string)
}

export function getDirFolders(dirPath: FolderName): string[] {
    return dirReader(dirPath).filter(fileName => !fileName.includes('.'))
}

export function getDirFoldersWith(dirPath: FolderName, include: string): string[] {
    return dirReader(dirPath).filter(fileName => !fileName.includes('.') || fileName.includes(include))
}
