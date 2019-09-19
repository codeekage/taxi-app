import FirebaseService from '../helpers/firebase.helper'
const firebase = new FirebaseService()

export const onDriverLocation = async (snap: any, context: any) => {
  try {
    const before = snap.before.data() || {}
    const after = snap.after.data() || {}
    if (before.fcmToken !== after.fcmToken) {
      const token = after.fcmToken
      const message = {
        token: token,
        data: {
          title: 'Match update',
          body: 'Arsenal goal in added time, score is now 3-0',
        },
        webpush: {
          headers: {
            Urgency: 'high',
          },
        },
      }
      console.log('Conditional Works Fine', 'Executing Function!')
      const write = await firebase.messaging.send(message)
      console.log('Message Sent', write)
      return
    }
    console.log('Message Sent', 'Nothing changed!')
  } catch (error) {
    console.error(error)
    return error
  }
}
