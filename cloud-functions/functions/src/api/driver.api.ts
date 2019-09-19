import * as cors from 'cors'
import * as express from 'express'
import { handleDriverFetch, handleAddDriver } from '../controller/drivers.handler';


export const app = express()
app.use(cors())


app.get('/fetch', handleDriverFetch)
app.post('/add', handleAddDriver)

