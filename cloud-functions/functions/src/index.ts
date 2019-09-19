import * as functions from 'firebase-functions'
import { app as bookingApi } from './api/booking.api'
import { app as driverLocationApi } from './api/driverlocation.api'
import { app as driversApi } from './api/driver.api'
import { onDriverLocation } from './triggers/driverlocation.trigger'
import {
  onPassBookingCreate,
  onDriverBookingUpdate,
} from './triggers/booking.trigger'

//http Resquest
export const booking = functions.https.onRequest(bookingApi)
export const driverlocation = functions.https.onRequest(driverLocationApi)
export const driver = functions.https.onRequest(driversApi)

//Triggers
export const onDriverWrite = functions.firestore
  .document('driverLocation/{driverLocationId}')
  .onWrite(onDriverLocation)
export const onBookingCreate = functions.firestore
  .document('bookings/{bookingId}')
  .onCreate(onPassBookingCreate)
export const onBookingUpdate = functions.firestore
  .document('bookings/{bookingId}')
  .onUpdate(onDriverBookingUpdate)
