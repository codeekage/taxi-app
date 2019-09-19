importScripts('https://www.gstatic.com/firebasejs/6.0.2/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/6.0.2/firebase-messaging.js')
const config = {
  messagingSenderId: '19874358374',
}
firebase.initializeApp(config)

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(payload => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  )
  self.localStorage.setItem('queryId', payload.data['docBookingId'])
  self.localStorage.setItem('bookingId', payload.data['bookingId'])
  // Customize notification here
  var notificationTitle = payload.data.title
  var notificationOptions = {
    body: payload.data.body,
    icon: './images/icon.png',
  }
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})
