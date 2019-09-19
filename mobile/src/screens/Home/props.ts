export default interface Props {
  locationStore: {
    currentLocation: {
      latitude: number
      longitude: number
      latitudeDelta: number
      longitudeDelta: number
    }
    notificationToken: string;
    setCurrentLocation: Function
    setPickUpLocation: Function
    setRegionChanage: Function
    setSelectedLocation: Function
    setNearbyDriver: Function 
    setNotificationToken: Function
    pickUpLocation: any
    dropOffLocation: any
    distanceMatrix: any
    nearByDrivers:any
    distanceFare: any
  }
  inputStore: {
    userInput: any
    setUserInput: any
    toggleSearchResult: any
  }
  componentStore: {
    isActive: boolean
    setFabActive: Function
    isToggled: boolean
    setSideToggle: Function
  }
  bookingStore: {
    bookings : object
    status : string
    setBookingStatus: any
  }
  navigation: {
    setParams: any
  }
}
