import FirebaseService from '../helpers/firebase.helper'
import ExpoService from '../helpers/expo.helper'
import Driver from '../helpers/drivers.helper'

const firebase = new FirebaseService()
const expo = new ExpoService()
const driverHelper = new Driver()

export const onPassBookingCreate = async (snap: any, context: any) => {
  try {
    const { bookingId, nearbyDriver } = snap.data()
    const docBookingId = context.params.bookingId
    const message = {
      token: nearbyDriver.fcmToken,
      data: {
        title: 'Pickup Notification',
        bookingId,
        docBookingId,
      },
      webpush: {
        headers: {
          Urgency: 'high',
        },
      },
    }
    console.log('Conditional Works Fine', 'Executing Function!')
    const write = await firebase.messaging.send(message)
    console.log('Message Success', write)
  } catch (error) {
    console.error(error)
    return error
  }
}

export const onDriverBookingUpdate = async (snap: any, context: any) => {
  try {
    const before = snap.before.data() || {}
    const after = snap.after.data() || {}
    //     if (before.bookingId === after.bookingId) {
    const { driverId, fcmToken } = before.nearbyDriver
    const { expToken } = before
    const driverDetails: any = await driverHelper.fetchDriversWithId(driverId)
    switch (after.status) {
      case 'accepted':
        //send passenger waiting to driver
        const fcm_send = await firebase.messaging.send({
          token: fcmToken,
          data: {
            title: 'Passenger Waiting',
          },
        })
        //send driver detail from id to client
        const firstname = driverDetails['firstname']
        const lastname = driverDetails['lastname']
        console.log(driverDetails)
        const expo_message = await expo.sendMessage([expToken], {
          data: {
            ...driverDetails,
            status: 'accepted',
          },
          title: 'Driver Found!',
          body: `Driver on the way ${firstname} ${lastname}`,
          sound: 'default',
        })

        console.log('Messaging Send', {
          expo_message,
          fcm_send,
        })
        break

      default:
        console.log('Cloud Messaging', 'This Looks Weird')
        break
    }
    //return
    //    }

    console.log('Booking Update:', 'Nothing to do here!')
  } catch (error) {
    console.error('Messaging Error!', error)
  }
}
