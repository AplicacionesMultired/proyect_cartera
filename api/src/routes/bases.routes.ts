import { getAllBases, getBaseDatalle, updateBase, usersSinBase } from '../controllers/bases.controller'
import { Router } from 'express' 

export const BasesRouter = Router()

BasesRouter.get('/getAllBases', getAllBases)

BasesRouter.get('/baseDetalle/:id', getBaseDatalle)

BasesRouter.get('/usersSinBase', usersSinBase)

BasesRouter.post('/updateBase', updateBase)
