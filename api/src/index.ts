import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import 'dotenv/config'

import { BasesRouter, CarteraRouter, SellersRouter, recaudoRouter } from './routes'

import { routerResumen } from './routes/resumen.routes'

const v1 = '/api/cartera/v1'
const app = express()
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'))
app.use(express.json())
app.use(cors({
  origin: process.env.CARTERA_FRONTEND as string,
  credentials: true,
}))

app.use(v1, CarteraRouter)

app.use(v1, BasesRouter)

app.use(v1, SellersRouter)

app.use(v1, routerResumen)

app.use(v1, recaudoRouter)

app.listen(PORT, () => {
  console.log(`Server is running at http:localhost:${PORT}`)
})

