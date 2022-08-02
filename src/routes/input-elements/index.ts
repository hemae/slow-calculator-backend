import {Router} from 'express'
import setRoutes from '../setRoutes'


const router = Router()
setRoutes('input-elements', router, {isAuth: [false, true, true, true, true]})
module.exports = router
