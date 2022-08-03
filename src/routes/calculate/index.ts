import {Router} from 'express'
import {requestCalculate, requestResult} from '../../controllers/calculate'


const router = Router()

router.post('/request-calculate', requestCalculate)
router.get('/:requestId', requestResult)

module.exports = router
