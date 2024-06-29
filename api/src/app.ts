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

// app.get('/sellers', GetSellers)

// app.get('/getAllBases', getAllBases)

// app.get('/baseDetalle/:id', getBaseDatalle)

// app.get('/updatesBases/:id', detalleUpdates)

// app.get('/usersSinBase', usersSinBase)

// app.post('/updateBase', updateBase)


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

