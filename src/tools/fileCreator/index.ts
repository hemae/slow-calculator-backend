import {mkdirSync, readdirSync, writeFileSync} from 'fs'

const ENCODING = 'utf8'

export function createFile(filePath: string, content: string): void {
    try {
        writeFileSync(filePath, content, ENCODING)
    } catch {
        let path = './'
        const splitPath = filePath.split('/')
        for (let item of splitPath) {
            const dirContent = readdirSync(path)
            path = path + '/' + item
            if (dirContent.indexOf(item) === -1) {
                if (item.split('.').length === 1) {
                    mkdirSync(path)
                } else {
                    writeFileSync(filePath, content, ENCODING)
                }
            }
        }
    }
}
