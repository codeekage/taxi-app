/* //check for key in local store

const URL = 'https://us-central1-pelagic-bonbon-233717.cloudfunctions.net'

const createDriverLocation = async () => {
  const hashKey = localStorage.getItem('hashKey')
  if (!hashKey) {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const { longitude, latitude } = position.coords
        const newLocation = await post(`${URL}/driverlocation/add`, {
          coordinates: {
            lat: latitude,
            lng: longitude,
          },
        })
        const response = await newLocation.json()
        localStorage.setItem('hashKey', response.hash)
        const fcmToken = await messaging.getToken()
        if (!fcmToken) {
          console.log('Failed to get token!')
          return
        }
        const setToken = await post(`${URL}/token/${response.hash}`, {
          fcmToken,
        })
        if (setToken) {
          console.log('Geolocation Success', { responses, fcmToken })
          return
        }
        console.log('Could not set!')
      },
      error => console.error('Geolocation Error', error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }
}

const post = async (url, body) => {
  try {
    const request = await fetch(url, {
      method: 'POST',
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



const hashKey = localStorage.getItem('hashKey')
if (!hashKey) {
  navigator.geolocation.getCurrentPosition(
    async position => {
      const { longitude, latitude } = position.coords
      const newLocation = await post(`${URL}/driverlocation/add`, {
        coordinates: {
          lat: latitude,
          lng: longitude,
        },
      })
      const hash = newLocation.data.hash
      localStorage.setItem('hashKey', hash)
      const fcmToken = await messaging.getToken()
      if (!fcmToken) {
        console.log('Failed to get token!')
        return
      }
      const setToken = await post(`${URL}/token/${hash}`, {
        fcmToken,
      })
      if (setToken) {
        console.log('Geolocation Success', { responses, fcmToken })
        return
      }
      console.log('Could not set!')
    },
    error => console.error('Geolocation Error', error),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  )
  return;
}
console.log("Your current key", hashKey) */