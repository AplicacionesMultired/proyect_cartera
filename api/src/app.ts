import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { BasesRouter, CarteraRouter, SellersRouter } from './routes'

const v1 = '/api/v1/'
const app = express()
const PORT = process.env.PORT || 4040;

app.use(express.json())
app.use(cors())

app.use(v1, CarteraRouter)

app.get(v1, BasesRouter)

app.get(v1, SellersRouter)


app.listen(PORT, () => {
  console.log(`Server is running at http:ocalhost:${PORT}`)
})

