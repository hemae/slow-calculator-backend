import express, {Express} from 'express'
import configGetter from './configGetter'
import log from './tools/logger'
import {getDirFolders} from './fileHandlers/dirReader'


const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

getDirFolders('routes')
    .forEach(folder => {
        app.use(`${configGetter('apiV')}/${folder}`, require(`./routes/${folder}`))
    })


const PORT: number = configGetter('port') || 5000;

(function () {
    try {
        app.listen(PORT, () => log.info(`Server has been started on port ${PORT}`))
    } catch (e: any) {
        log.error(`Server Error: ${e.message}`)
        process.exit(1)
    }
})()
