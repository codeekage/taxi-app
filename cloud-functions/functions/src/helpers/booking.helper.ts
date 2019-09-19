import FirebaseService from './firebase.helper'
import { Result } from './interface'

export default class BookingService extends FirebaseService {
  async fetchAllBookings(): Promise<Result> {
    try {
      const data: any = []
      const bookings = await this.firestore.collection('bookings').get()
      bookings.forEach(async (bookingItems: any) => {
        await data.push(bookingItems.data())
      })
      return Promise.resolve({ success: true, data })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }

  async fetchAllBookingWithId(bookingId: string): Promise<Result> {
    try {
      const bookings = await this.firestore
        .collection('bookings')
        .doc(bookingId)
      const data = await bookings.get()
      return Promise.resolve({ success: true, ...data.data() })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }

  async addBookings(booking: object): Promise<Result> {
    try {
      const bookings = await this.firestore.collection('bookings').add(booking)
      const result = await bookings.get()
      const data = result.data()
      return Promise.resolve({ success: true, data })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }

  async updateBooking(bookingId: string, booking: object): Promise<Result> {
    try {
      await this.firestore
        .collection('bookings')
        .doc(bookingId)
        .update(booking)
      return Promise.resolve({ success: true, booking })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }
}
