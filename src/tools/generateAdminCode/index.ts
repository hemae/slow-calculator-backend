import jwt from 'jsonwebtoken'
import configGetter from '../../configGetter'
import {jsonFileWriter} from '../../fileHandlers'
import {getArrayData} from '../../dataHandlers/getArrayData'


export async function generateAdminCode() {
    const newCode = jwt.sign({description: 'admin-code'},
        configGetter('jwtSecret')!,
        {expiresIn: '10000d'})
    jsonFileWriter<string>({
        folderName: 'admin-code',
        fileName: 'index',
        data: {token: newCode}
    })
    const adminEmails = getArrayData({folderName: 'admins'}).map(admin => admin.email)
    // send email with new code
}
