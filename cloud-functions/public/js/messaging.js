const URL =
  'https://us-central1-pelagic-bonbon-233717.cloudfunctions.net/driverlocation'
const BOOKING_URL =
  'https://us-central1-pelagic-bonbon-233717.cloudfunctions.net/booking'

const clientFCM = async messaging => {
  try {
    const hashKey = localStorage.getItem('hashKey')
    if (!hashKey || hashKey === 'undefined') {
      console.log('Creating!')
      setDriverLocation({
        method: 'POST',
        messaging,
        type: 'add',
      })
      return
    }
    console.log('Updating!')
   /*  setDriverLocation({
      method: 'PUT',
      messaging,
      type: `hash/${hashKey}`,
    }) */
    console.log('Your current key', hashKey)
  } catch (error) {
    console.log(error)
  }
}

const initFCM = async messaging => {
  try {
    const permission = await Notification.requestPermission()
    permission === 'granted' ? clientFCM(messaging) : console.log('Failed!')
    // console.log("Succesful")
  } catch (error) {
    console.log('Error', error)
  }
}

const setDriverLocation = async option => {
  try {
    console.log('Fuckin!!!')
    //get option variables
    const { method, messaging, type } = option
    //get driver location
    navigator.geolocation.getCurrentPosition(
      async position => {
        const { longitude: lng, latitude: lat } = position.coords
        const fcmToken = await messaging.getToken()
        const addDriverLocation = await post(`${URL}/${type}`, {
          coordinates: { lat, lng },
          driverId: 'rSDhupEDCW9CocyUTHNf',
          fcmToken: fcmToken,
        })
        if(addDriverLocation.success){
          localStorage.setItem('hashKey', addDriverLocation.data.hash)
          console.log(addDriverLocation)
          return;
        }
        console.error(addDriverLocation)
      },
      error => console.error('Geolocation Error', error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  } catch (error) {
    console.log(error)
  }
}

const onMessage = messaging => {
  try {
    messaging.onMessage(payload => {
      localStorage.setItem('queryId', payload.data['docBookingId'])
      localStorage.setItem('bookingId', payload.data['bookingId'])
      console.log('FCM Messaging', payload)
    })
  } catch (error) {
    console.error(error)
  }
}

const tokenRefreshed = messaging => {
  messaging.onTokenRefresh(async () => {
    await clientFCM(messaging)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const messaging = firebase.messaging()
  messaging.usePublicVapidKey(
    'BGlTmYiXLLPgoHZG4xcYg-f8iLfPzNG8czjgtqYG5nkjqgdngKuAAyM_YJdFzNCYjBkBlya3H6duViJrSiHeFio'
  )
  tokenRefreshed(messaging)
  initFCM(messaging)
  onMessage(messaging)
})
