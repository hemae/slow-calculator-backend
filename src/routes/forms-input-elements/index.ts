import {Router} from 'express'
import setRoutes from '../setRoutes'


const router = Router()
setRoutes('forms-input-elements', router, {isAuth: [false, true, true, true, true]})
module.exports = router
