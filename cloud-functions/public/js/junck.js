/* document.addEventListener('DOMContentLoaded', function() {
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // // The Firebase SDK is initialized and available here!
    //
    // firebase.auth().onAuthStateChanged(user => { });
    // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    //
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    try {
      let app = firebase.app();
      let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
      document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;
    } catch (e) {
      console.error(e);
      document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
    }
  }); */


/* 
  const clientFCM = async messaging => {
    const fcmToken = await messaging.getToken()
    if (!fcmToken) {
      console.log('Failed to get token!')
      return
    }
    const setToken = await post(`${URL}/token/dsIB3gfzY0Oqs4RMqXip`, { fcmToken })
    if (setToken) {
      navigator.geolocation.watchPosition(
        async position => {
          console.log('watcher', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
          updateDriver(position.coords.latitude, position.coords.longitude)
        },
        error => error.message,
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      )
      console.log('API RESPONSE', setToken)
      console.log('USER TOKEN', fcmToken)
  
      messaging.onMessage(payload => {
        console.log('Messaging Forebackgroung', payload)
      })
      return
    }
    console.log('USER TOKEN', 'NOT SET')
  } */



  /* window.onload = () => {
    navigator.geolocation.getCurrentPosition(
      async position => {
        console.log("watcher", {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        updateDriver(position.coords.latitude, position.coords.longitude);
      },
      error => error.message,
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  
    console.log("runing");
  };
  
  async function updateDriver(latitude, longitude) {
    try {
      const post = await fetch(
        "https://us-central1-pelagic-bonbon-233717.cloudfunctions.net/driverlocation/update/dsIB3gfzY0Oqs4RMqXip",
        {
          method: "PUT",
          body: JSON.stringify({
            coordinates: [latitude, longitude]
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const result = await post.json();
      console.log(JSON.stringify(result));
    } catch (error) {
      console.error("Error", error);
    }
  } */
  