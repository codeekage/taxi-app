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
        method : 'POST', 
        messaging, 
        type: 'token/rSDhupEDCW9CocyUTHNf'
      })
      return
    }
    console.log('Updating!')
    setDriverLocation({
      method : 'PUT', 
      messaging,
      type: `hash/${hashKey}`
    })
    console.log('Your current key', hashKey)
  } catch (error) {
    console.log(error)
  }
}

const setDriverLocation = async (option) => {
  try {
    let hash
    const {method, messaging, type} = option 
    const fcmToken = await messaging.getToken()
    navigator.geolocation.getCurrentPosition(
      async position => {
        const { longitude, latitude } = position.coords
        const location = await post(method, `${URL}/${type}`, {
          coordinates: {
            lat: latitude,
            lng: longitude,
          },
          driverId: "6mznEUpUdlC5Rf8r98az",
          fcmToken
        })
        if (location !== 'undefined') {
          hash = location.data.hash
          console.log(location.data)
          localStorage.setItem('hashKey', hash)
          !fcmToken
            ? console.log('Failed to get token!')
            : setFCMToken(hash, fcmToken)
          messaging.onMessage(async payload => {
            console.log('Foreground Message', payload)
            const bookingDetails = await get(`${BOOKING_URL}}/${payload.data.bookingId}`)
            console.log(bookingDetails)
          })
          console.log('Geolocation Success', { location, fcmToken })
          return
        }
        hash = localStorage.getItem('hashKey')
        setFCMToken(hash, fcmToken)
        messaging.onMessage(payload => {
          console.log('Foreground Message', payload)
        })
        return
      },
      error => console.error('Geolocation Error', error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  } catch (error) {
    console.log(error)
  }
}

const setFCMToken = async (hash, fcmToken) => {
  const setToken = await post('POST', `${URL}/token/${hash}`, {
    fcmToken,
  })
  if (setToken) {
    console.log(setToken)
    console.log('FCM Token:', { fcmToken })
  }
}

const tokenRefreshed = messaging => {
  messaging.onTokenRefresh(async () => {
    await clientFCM(messaging)
  })
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

const post = async (type, url, body) => {
  try {
    const request = await fetch(url, {
      method: type,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const response = await request.json()
    return Promise.resolve(response)
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}


const get = async (url) => {
  try {
    const request = await fetch(url)
    const response = await request.json()
    return Promise.resolve(response)
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

async function updateDriver(latitude, longitude) {
  try {
    const post = await fetch(`${URL}/update/dsIB3gfzY0Oqs4RMqXip`, {
      method: 'PUT',
      body: JSON.stringify({
        coordinates: [latitude, longitude],
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET,PUT,POST',
      },
    })
    const result = await post.json()
    console.log(JSON.stringify(result))
  } catch (error) {
    console.error('Error', error)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const messaging = firebase.messaging()
  messaging.usePublicVapidKey(
    'BGlTmYiXLLPgoHZG4xcYg-f8iLfPzNG8czjgtqYG5nkjqgdngKuAAyM_YJdFzNCYjBkBlya3H6duViJrSiHeFio'
  )
  tokenRefreshed(messaging)
  initFCM(messaging)
})
