import configGetter, {DatabaseFolderName} from '../configGetter'
import rimraf from 'rimraf'


export function jsonFileDeleter(folderName: DatabaseFolderName, fileName: string): void {
    rimraf.sync(`${configGetter('dataBasePath')}/${configGetter('appName')}-${configGetter('databaseSuffix')}${configGetter(folderName)}/${fileName}.json`)
}
