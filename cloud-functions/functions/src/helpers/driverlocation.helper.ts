import FirebaseService from './firebase.helper'
import { Result } from './interface'
import { GeoCollectionReference, GeoFirestore, GeoQuery } from 'geofirestore'
import * as geokit from 'geokit'
import Driver from './drivers.helper'

export default class DriverLocation extends FirebaseService {
  private locRef = this.firestore.collection('driverLocation')

  private async getDriverData(docId: string) {
    const query = await this.locRef.doc(docId)
    return query
  }

  private async setDriverId(hash: string, driverId: any): Promise<Result> {
    try {
      const query = await this.getDriverData(hash)
      await query.set({ driverId }, { merge: true })
      return Promise.resolve({ success: true, driverId })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }

  private async setMessagingToken(hash : string, fcmToken: string): Promise<Result> {
    try {
      const query = await this.getDriverData(hash)
      await query.set({ fcmToken }, { merge: true })
      return Promise.resolve({ success: true, fcmToken })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }

  async addGeoLocation(
    coordinates: {
      lat: number
      lng: number
    },
    driverId: string,
    fcmToken: string
  ): Promise<Result> {
    try {
      const { lat, lng } = coordinates
      const hash = geokit.Geokit.hash(coordinates)
      const geofirestore: GeoFirestore = new GeoFirestore(this.firestore)
      const geocollection: GeoCollectionReference = geofirestore.collection(
        'driverLocation'
      )
      const query = await geocollection.doc(hash)
      await query.set({
        coordinates: new this.firestoreGeo.GeoPoint(lat, lng),
      })
      const driver = await this.setDriverId(hash, driverId)
      const messagingToken = await this.setMessagingToken(hash, fcmToken)
      return Promise.resolve({
        success: true,
        data: { hash, coordinates, messagingToken, driver },
      })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }

  async updateGeoLocation(
    hash: string,
    coordinates: { lat: number; lng: number }
  ) {
    try {
      const { lat, lng } = coordinates
      const geofirestore: GeoFirestore = new GeoFirestore(this.firestore)
      const geocollection: GeoCollectionReference = geofirestore.collection(
        'driverLocation'
      )
      const query = await geocollection.doc(hash)
      await query.update({
        coordinates: new this.firestoreGeo.GeoPoint(lat, lng),
      })
      return Promise.resolve({ success: true, data: { hash, coordinates } })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }

 
  async findNerbyDrivers(lat: number, lng: number): Promise<Result> {
    try {
      const result = new Array()
      const snapshot = new Array();
      const docsQuery = await this.locRef.get()

      //const nearbyDriver = nearby.docs
      docsQuery.forEach(async data => {
          await snapshot.push(data.data())
      })

      const geofirestore: GeoFirestore = new GeoFirestore(this.firestore)
      const geocollection: GeoCollectionReference = geofirestore.collection(
        'driverLocation'
      )
      const query: GeoQuery = await geocollection.near({
        center: new this.firestoreGeo.GeoPoint(lat, lng),
        radius: 1000,
      })
      
      const nearby = await query.get()

      nearby.docs.map((driver, index) => {
        result.push(Object.assign({}, nearby.docs[index], snapshot[index]))
      })

      return Promise.resolve({
        success: true,
        data: result
      })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }

  async findDriverWithKey(hash: string): Promise<Result> {
    try {
      const key = await this.firestore.collection('driverLocation').doc(hash)
      const driver = await key.get()
      const helper = new Driver()
      const data = driver.data()
      if (data) {
        const driverData = await helper.fetchDriversWithId(data.driverId)
        return Promise.resolve({
          success: true,
          ...driver.data(),
          driverData,
        })
      }
      return Promise.reject({ success: false, ...driver.data() })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }
}
