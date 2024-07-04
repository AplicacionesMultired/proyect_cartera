import { getCarteraResumen } from '../controllers/resumen.controller'
import { Router } from 'express'

export const routerResumen = Router()

routerResumen.get('/resumenCartera', getCarteraResumen)