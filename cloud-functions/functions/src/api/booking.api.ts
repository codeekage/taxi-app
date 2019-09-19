import * as cors from 'cors'
import * as express from 'express'
import { handleFetchAllBooking, handleAddBooking, handleFetchBooking, handleUpdateBooking } from '../controller/booking.handler';


export const app = express()
app.use(cors())


app.get('/fetch', handleFetchAllBooking)
app.post('/add', handleAddBooking)
app.put('/update/:bookingId', handleUpdateBooking)
app.get('/fetch/:bookingId', handleFetchBooking)

