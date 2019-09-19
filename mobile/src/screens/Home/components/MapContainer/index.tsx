import React from 'react'
import { Text, View } from 'native-base'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import styles from './MapContainerStyles'
import SearchBox from '../SearchBox'
import NotificationBox from '../NotificationBox'
/* import SearchResults from '../SearchResults';
 */

interface Props {
  region: {
    latitude: number
    longitude: number
    latitudeDelta: number
    longitudeDelta: number
  }
  pickupMarker: any
  notification: any
  dropOffMarker: any
  nearByDrivers: any
}

//const PIN_COLOR = ['red', 'blue', 'green']

const MapContainer = ({
  region,
  pickupMarker,
  dropOffMarker,
  notification,
  nearByDrivers,
}: Props) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        showsUserLocation={true}
      >
        {nearByDrivers &&
          nearByDrivers.map((driver: any, index: any) => (
            <Marker
              key={index}
              coordinate={{
                latitude: driver.d.coordinates._lat,
                longitude: driver.d.coordinates._long,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.latitudeDelta,
              }}
              image={require('../../../../assets/images/carMarker.png')}
            />
          ))}
        {pickupMarker.latitude !== 0 && (
          <Marker coordinate={pickupMarker} pinColor="green" tracksViewChanges>
            <Callout>
              <Text>Pickup</Text>
            </Callout>
          </Marker>
        )}
        {dropOffMarker !== 0 && (
          <Marker coordinate={dropOffMarker} pinColor="red" tracksViewChanges>
            <Callout>
              <Text>Destination</Text>
            </Callout>
          </Marker>
        )}
      </MapView>
        {(notification.origin && <NotificationBox driver={notification.data}  /> ) || <SearchBox />}
    </View>
  )
}

export default MapContainer
