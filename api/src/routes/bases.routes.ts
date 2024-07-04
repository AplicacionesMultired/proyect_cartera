import { getAllBases, getBaseDatalle, updateBase, usersSinBase, crearBase } from '../controllers/bases.controller'
import { Router } from 'express' 

export const BasesRouter = Router()

BasesRouter.get('/getAllBases', getAllBases)

BasesRouter.get('/baseDetalle/:id', getBaseDatalle)

BasesRouter.get('/usersSinBase', usersSinBase)

BasesRouter.post('/updateBase', updateBase)

BasesRouter.post('/asignar-base', crearBase)
