import { getCartera, getCarteraSinABS } from './controllers/cartera.controller'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { getBaseDatalle } from './controllers/bases.controller'

const app = express()
const PORT = process.env.PORT || 4040;

app.use(express.json())
app.use(cors())

app.get('/cartera', getCartera)

app.get('/carteraSinABS', getCarteraSinABS)

app.get('/baseDetalle/:id', getBaseDatalle)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

/*
async function test(){
  try {
    await conection.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

test()
*/