import { observable, action, computed } from 'mobx'
import { Dimensions } from 'react-native'
import calculateFare from '../screens/Home/components/util/calculate.fare'

const { width, height } = Dimensions.get('window')

const ASPECT_RATIO = width / height

const LATITUDE_DELTA = 0.01
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA
const API_KEY = 'AIzaSyBsQHTADk-AkBDtj_JG2_cL3oxABF51tdQ'

interface Coordinates {
  latitude: number
  latitudeDelta: number
  longitude: number
  longitudeDelta: number
}

interface Matrix {
  destination: any
  origin: any
  distanceText: any
  distanceValue: any
  durationText: any
  durationValue: any
}

export default class LocationStore {
  private initialRegion = {
    latitude: 0,
    latitudeDelta: 0,
    longitude: 0,
    longitudeDelta: 0,
  }

  @observable private region: Coordinates = this.initialRegion
  @observable private selectedPickUpLocation: Coordinates = this.initialRegion
  @observable private selectedDropOffLocation: Coordinates = this.initialRegion
  @observable private nearbyDrivers: any

  @observable noti_token : any;

  @observable private lockdistanceMatrix: Matrix = {
    destination: null,
    origin: null,
    distanceText: null,
    distanceValue: null,
    durationText: null,
    durationValue: null,
  }

  @observable private fare: number = 0

  @computed get currentLocation() {
    return this.region
  }

  @computed get notificationToken(){
    return this.noti_token;
  }

  @action setNotificationToken(token : string){
    this.noti_token = token;
  }

  @action async setCurrentLocation() {
    await navigator.geolocation.getCurrentPosition(
      position =>
        (this.region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
      error => error.message,
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  @computed get pickUpLocation() {
    return this.selectedPickUpLocation
  }

  @action setPickUpLocation(payload: any) {
    const { location } = payload
    this.selectedPickUpLocation = {
      longitude: location.lng,
      latitude: location.lat,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }
    this.setdistanceMatrix(API_KEY)
  }

  @computed get dropOffLocation() {
    return this.selectedDropOffLocation
  }

  @action setDropOffLocation(payload: any) {
    const { location } = payload
    this.selectedDropOffLocation = {
      longitude: location.lng,
      latitude: location.lat,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }
    this.setdistanceMatrix(API_KEY)
  }

  @computed get distanceMatrix() {
    return this.lockdistanceMatrix
  }

  @computed get distanceFare() {
    return this.fare
  }

  @computed get nearByDrivers() {
    return this.nearbyDrivers
  }

  @action resetFare() {
    this.fare = 0
  }

  @action async setNearbyDriver() {
    try {
      //{}
      const URL =
        'https://us-central1-pelagic-bonbon-233717.cloudfunctions.net/driverlocation'
      //const { latitude: lat, longitude: lng } = this.currentLocation
      const responses = await fetch(
        `${URL}/nearby?lat=4.798321849671004&lng=7.025398844859586`
      )
      const drivers = await responses.json()
      this.nearbyDrivers = drivers.data
    } catch (error) {
      console.log(error)
    }
  }

  @action async setdistanceMatrix(API_KEY: string) {
    const initialRate = {
      baseFare: 0.4,
      timeRate: 0.14,
      distanceRate: 0.97,
      surge: 1,
    }
    if (
      this.pickUpLocation.latitude !== 0 &&
      this.dropOffLocation.latitude !== 0
    ) {
      try {
        const responses = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${
          this.pickUpLocation.latitude
        },${this.pickUpLocation.longitude}&destinations=${
          this.dropOffLocation.latitude
        },${this.dropOffLocation.longitude}&mode=driving&key=${API_KEY}
        `)
        const matrix = await responses.json()
        this.lockdistanceMatrix = {
          destination: matrix.destination_addresses[0],
          origin: matrix.origin_addresses[0],
          durationText: matrix.rows[0].elements[0].duration.text,
          durationValue: matrix.rows[0].elements[0].duration.value,
          distanceText: matrix.rows[0].elements[0].distance.text,
          distanceValue: matrix.rows[0].elements[0].distance.value,
        }
        setTimeout(() => {
          const fare = calculateFare(
            initialRate.baseFare,
            initialRate.timeRate,
            this.distanceMatrix.durationValue,
            initialRate.distanceRate,
            this.distanceMatrix.distanceValue,
            initialRate.surge
          )
          this.fare = fare
        }, 2000)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
