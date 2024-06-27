import { detalleUpdates, getBaseDatalle, updateBase, getAllBases, usersSinBase} from './controllers/bases.controller'
import { getCartera } from './controllers/cartera.controller'

import express from 'express'
import cors from 'cors'
import 'dotenv/config'


const app = express()
const PORT = process.env.PORT || 4040;

app.use(express.json())
app.use(cors())

app.get('/cartera', getCartera)

app.get('/getAllBases', getAllBases)

app.get('/baseDetalle/:id', getBaseDatalle)

app.get('/updatesBases/:id', detalleUpdates)

app.get('/usersSinBase', usersSinBase)

app.post('/updateBase', updateBase)


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

