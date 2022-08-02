import {Router} from 'express'
import setRoutes from '../setRoutes'


const router = Router()
setRoutes('forms', router, {
    isAuth: [false, true, true, true, true],
    relations: ['input-elements']
})
module.exports = router
