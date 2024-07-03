import { getBaseDatalle, updateBase, getAllBases, usersSinBase} from './controllers/bases.controller'
import { GetSellers } from './controllers/sellers.controller'

import { CarteraRouter } from './routes/cartera.routes'

import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 4040;

app.use(express.json())
app.use(cors())

app.use('/api/v1/', CarteraRouter)

app.get('/api/v1/sellers', GetSellers)

app.get('/api/v1/getAllBases', getAllBases)

app.get('/api/v1/baseDetalle/:id', getBaseDatalle)

// app.get('/api/v1/updatesBases/:id', detalleUpdates)

app.get('/api/v1/usersSinBase', usersSinBase)

app.post('/api/v1/updateBase', updateBase)

app.listen(PORT, () => {
  console.log(`Server is running at http:ocalhost:${PORT}`)
})

