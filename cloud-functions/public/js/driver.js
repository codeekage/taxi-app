async function findNearByDrivers() {
  try {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const arru = []
        arru.length
        const {latitude: lat, longitude : lng} = position.coords
        const nearByDrivers = await get(`${URL}/nearby?lat=${lat}&lng=${lng}`)
        console.log('NEARBY', nearByDrivers)
      },
      error => console.error("Driver Geolocation Error: Unable to find Nearby Drivers", error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  } catch (error) {
    console.log(error)
  }
}

findNearByDrivers()
 


