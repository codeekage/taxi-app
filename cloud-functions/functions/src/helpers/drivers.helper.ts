import FirebaseService from './firebase.helper'
import { Result } from './interface'

export default class Driver extends FirebaseService {
  async fetchAllDrivers(): Promise<Result> {
    try {
      const data = new Array()
      const drivers = await this.firestore.collection('drivers').get()
      drivers.forEach(async driver => {
        await data.push(driver.data())
      })
      return Promise.resolve({ success: true, data })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }
  async fetchDriversWithId(driverId : string): Promise<Result> {
    try {
      const drivers = await this.firestore.collection('drivers').doc(driverId).get()
      return Promise.resolve({ success: true, ...drivers.data() })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }

  async addDrvier(driversDetail: object): Promise<Result> {
    try {
      const drivers = await this.firestore
        .collection('drivers')
        .add(driversDetail)
      const addedDriver = await drivers.get()
      return Promise.resolve({ success: true, data: addedDriver.data() })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }
}
