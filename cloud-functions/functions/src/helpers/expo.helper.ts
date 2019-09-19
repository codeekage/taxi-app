import Expo from 'expo-server-sdk'

interface optionType {
  sound?: string
  body?: string
  title?: string
  data?: object
}

export default class ExpoService {
  private expo = new Expo()

  async sendMessage(tokens: any[], options: optionType) {
    try {
      const messages: any[] = []
      for (const pushToken of tokens) {
        // Check that all your push tokens appear to be valid Expo push tokens
        if (!Expo.isExpoPushToken(pushToken)) {
          console.error(
            `Push token ${pushToken} is not a valid Expo push token`
          )
          continue
        }
        // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
        messages.push({
          to: pushToken,
          sound: options['sound'],
          body: options['body'],
          data: options['data'],
        })
      }
      const push_state = await this.sendPushNotification(messages)
      return Promise.resolve({ messages, push_state })
    } catch (error) {
      console.error(`Error Message: ${error}`)
      return Promise.reject({ error })
    }
  }

  private async sendPushNotification(messages: any[]): Promise<any[]> {
    try {
      const chunks = this.expo.chunkPushNotifications(messages)
      const tickets: any[] = []
      for (const chunk of chunks) {
        const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk)
        console.log(ticketChunk)
        tickets.push(...ticketChunk)
      }
      const result = await this.getReceipt(tickets)
      return Promise.resolve(result)
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  private async getReceipt(tickets: any[]) {
    try {
      const receiptIds = []
      for (const ticket of tickets) {
        if (ticket.id) {
          receiptIds.push(ticket.id)
        }
      }

      const receiptIdChunks = this.expo.chunkPushNotificationReceiptIds(
        receiptIds
      )
      for (const chunk of receiptIdChunks) {
        const receipts: any = await this.expo.getPushNotificationReceiptsAsync(
          chunk
        )
        if (typeof receipts === 'object' && receipts.constructor === Array) {
          for (const receipt of receipts) {
            if (receipt.status === 'ok') {
              return Promise.resolve(receipt)
            } else if (receipt.status === 'error') {
              console.error(
                `There was an error sending a notification: ${receipt.message}`
              )
              if (receipt.details && receipt.details.error) {
                console.error(`The error code is ${receipt.details.error}`)
              }
              return Promise.reject(receipt)
            }
          }
          return
        }
      }

      return Promise.resolve('Nothing Happened!')
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  }
}
