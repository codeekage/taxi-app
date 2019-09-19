import * as cors from 'cors'
import * as express from 'express'
import { handleFetchNearByDrivers, handleAddGeoLocation, handleUpdateGeoLocation, handleDriverWithKey } from '../controller/drivelocation.handler';

export const app = express()
app.use(cors())

/* app.put('/update/:driverId', handleUpdateLocation)
 */
app.post('/add', handleAddGeoLocation)
app.get('/nearby', handleFetchNearByDrivers)
app.put('/update/:key', handleUpdateGeoLocation)
app.get('/driver/:key', handleDriverWithKey)

