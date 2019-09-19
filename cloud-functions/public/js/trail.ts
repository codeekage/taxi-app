const BOOKING_URL =
  'https://us-central1-pelagic-bonbon-233717.cloudfunctions.net/booking'

export async function selectNearByDriver(): Promise<object> {
  try {
    const object = {}
    return Promise.resolve(object)
  } catch (error) {
    return Promise.reject(error)
  }
}

//passenger booking
export async function passengerBooking() {
  try {
    const addBooking = await post(`${BOOKING_URL}/add`, {
      userId: 'RANDOM_STRING_ASYNC_STORAGE',
      token: 'FCM_TOKEN_ASYNC_STORAGE',
      nearbyDriver: await selectNearByDriver(),
      pickUp: {},
      dropOff: {},
      status: 'pending',
    })
    store(addBooking)
  } catch (error) {
    errorstore(error)
  }
}

//driver booking
export async function dirverBooking() {
  try {
    let bookingId: any
    const acceptBooking = await put(`${BOOKING_URL}/update/${bookingId}`, {
      driverLocation: 'CURRENT_LOCATION_ASYNC_STORAGE',
      status: 'confrimed',
    })
    store(acceptBooking)
  } catch (error) {
    errorstore(error)
  }
}

export async function onConfrimation() {
  const context = onWrite('/booking/{bookingId}')
  let admin: any
  const pass_fcmToken = context.booking.fcmToken
  const booking_id = context.bookingId
  const driver_fcmToken = context.nearbyDriver.fcmToken
  const driver_details = context.nearbyDriver.driver_details
  const riding_payload = {
    data: {
      message: `You are riding with ${driver_details}`,
    },
  }
  const riding_option = {
    data: {
      message: `You are riding with ${driver_details}`,
    },
  }
  const confirm_payload = {
    data: {
      message: `You are riding with ${driver_details}`,
    },
  }
  const confirm_option = {
    data: {
      message: `You are riding with ${driver_details}`,
    },
  }

  switch (context.after.status) {
    case 'confirm':
      try {
        const subscription = await admin
          .messaging()
          .subscribeToTopic(
            [pass_fcmToken, driver_fcmToken],
            `ride_request${booking_id}`
          )
        const onMessage = admin
          .messaging()
          .sendToTopic(
            `ride_request${booking_id}`,
            confirm_payload,
            confirm_option
          )
        console.log(subscription)
        console.log(onMessage)
      } catch (error) {
        console.error(error)
      }
      break
    case 'riding':
      try {
        const onMessage = await admin
          .messaging()
          .sendToTopic(
            `ride_request${booking_id}`,
            riding_payload,
            riding_option
          )
        console.log(onMessage)
      } catch (error) {
        console.error(error)
      }
      break
    case 'end_ride':
      try {
        const onMessage = await admin
          .messaging()
          .sendToTopic(
            `ride_request${booking_id}`,
            riding_payload,
            riding_option
          )
        const subscription = await admin
          .messaging()
          .unsubscribeFromTopic(
            [pass_fcmToken, driver_fcmToken],
            `ride_request${booking_id}`
          )
        console.log(subscription)
        console.log(onMessage)
      } catch (error) {
        console.error(error)
      }
      break
    default:
      const onMessage = await admin.messaging().send({
        token: pass_fcmToken,
        message: 'Finding drivers!',
      })
      console.log(onMessage)
      break
  }
}

function onWrite(docPath: string) {
  let data: any
  return data
}

export function store(toStore: any) {}

export function errorstore(toStore: any) {}

export function get(url: string) {}

export function post(url: string, body: object) {}

export function put(url: string, body: object) {}
