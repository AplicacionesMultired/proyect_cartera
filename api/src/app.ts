import { getCartera, getCarteraSinABS } from './controllers/cartera.controller'
import { detalleUpdates, getBaseDatalle, updateBase } from './controllers/bases.controller'

import express from 'express'
import cors from 'cors'
import 'dotenv/config'


const app = express()
const PORT = process.env.PORT || 4040;

app.use(express.json())
app.use(cors())

app.get('/cartera', getCartera)

app.get('/carteraSinABS', getCarteraSinABS)

app.get('/baseDetalle/:id', getBaseDatalle)

app.get('/updatesBases/:id', detalleUpdates)

app.post('/updateBase', updateBase)


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