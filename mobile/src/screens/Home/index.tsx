import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import MapContainer from './components/MapContainer'
import AppFab from '../components/Fab'
import Drawer from './components/Drawer'
import Props from './props'
import { autorun } from 'mobx'
import { StatusBar, ActivityIndicator } from 'react-native'
import { Permissions, Notifications } from 'expo'
import FindDriver from '../components/FindingDriver'
interface State {
  toggle?: boolean
  notification: any
}

@inject('locationStore', 'bookingStore')
@observer
export default class Home extends Component<Props, State> {
  _notificationSubscription: any

  constructor(props: any) {
    super(props)

    this.state = {
      notification: {},
    }

    autorun(() =>
      console.info('dropoff', { ...this.props.locationStore.dropOffLocation })
    )
    autorun(() =>
      console.info('pickup', { ...this.props.locationStore.pickUpLocation })
    )
    autorun(() =>
      console.info('distanceMatrix', {
        ...this.props.locationStore.distanceMatrix,
      })
    )
    autorun(() =>
      console.info('distanceFare', this.props.locationStore.distanceFare)
    )
    autorun(() =>
      console.info(
        'notificationToken',
        this.props.locationStore.notificationToken
      )
    )
  }

  async registerPushNotifiction() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    )
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      return
    }
    let token = await Notifications.getExpoPushTokenAsync()
    return token
  }

  async componentDidMount() {
    var rx = this
    this.props.locationStore.setCurrentLocation()
    const notificationToken = await this.registerPushNotifiction()
    if (notificationToken) {
      this.props.locationStore.setNotificationToken(notificationToken)
    }
    setTimeout(function() {
      rx.props.locationStore.setNearbyDriver()
    }, 1000)

    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    )
  }

  componentDidUpdate() {
    if (this.state.notification.origin) {
      this.props.bookingStore.setBookingStatus('accepted')
      console.log(this.state.notification)
    }
  }

  _handleNotification = (notification: any) => {
    this.setState({ notification: notification })
  }

  render() {
    return (
      <Drawer>
        {StatusBar.setBarStyle('light-content')}
        {(this.props.bookingStore.status !== 'pending' && (
          <>
            {this.props.locationStore.currentLocation && (
              <MapContainer
                region={{ ...this.props.locationStore.currentLocation }}
                dropOffMarker={{ ...this.props.locationStore.dropOffLocation }}
                pickupMarker={{ ...this.props.locationStore.pickUpLocation }}
                nearByDrivers={this.props.locationStore.nearByDrivers}
                notification={this.state.notification}
              />
            )}
            <AppFab
              fare={this.props.locationStore.distanceFare}
              notification={this.state.notification}
            />
          </>
        )) || <FindDriver />}
      </Drawer>
    )
  }
}
