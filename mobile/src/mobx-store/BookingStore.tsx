import { observable, action, computed } from 'mobx'

export default class BookingStore {
  @observable lockBookings: object = {}
  @observable status: string = 'on'

  @computed get bookingstatus() {
    return this.status
  }

  @action setBookingStatus(status: string) {
    this.status = status
  }

  @computed get bookings() {
    return this.lockBookings
  }

  @action async setBookings(store: any) {
    const { driverId, fcmToken, distance } = store.nearByDrivers[0]
    const bookingId =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    try {
      this.lockBookings = {
        bookingId,
        expToken: store.notificationToken,
        username: 'codeekage',
        pickUp: {
          address: store.distanceMatrix.origin,
          latitude: store.pickUpLocation.latitude,
          longitude: store.pickUpLocation.longitude,
        },
        dropOff: {
          address: store.distanceMatrix.destination,
          latitude: store.dropOffLocation.latitude,
          longitude: store.dropOffLocation.longitude,
        },
        fare: store.distanceFare,
        timeStamp: Date.now(),
        nearbyDriver: {
          driverId,
          fcmToken,
          distance,
        },
        status: 'pending',
      }
      //   const data = this.bookings
      const addBooking = await fetch(
        'https://us-central1-pelagic-bonbon-233717.cloudfunctions.net/booking/add',
        {
          method: 'POST',
          body: JSON.stringify({
            data: this.bookings,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const result = await addBooking.json()
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }
}
