import React from 'react'
import { Card, CardItem, Item } from 'native-base'
import GoogleSearch from './GoogleSearch'
import { inject, observer } from 'mobx-react'
import { Ionicons as Icon } from '@expo/vector-icons'



const SearchBox = inject('locationStore')(
  observer(({locationStore}) => {
  
    return (
      <Card style={{ marginTop: 10, borderRadius: 20 }}>
        <CardItem style={{ marginBottom: -0.5, borderRadius: 30 }}>
          <Item>
            <Icon name="ios-pin" size={20} color="#0066cc" />
            <GoogleSearch
              placeholder="Pickup Location"
              autoFocus={false}
              onPress={(data: any, details: any) => {
                locationStore.setPickUpLocation({ location: details.geometry.location })
                
              }}
              listView={{
                backgroundColor: 'white',
                position: 'absolute',
                top: 100,
                width: 340,
                left: -20,
              }}
            />
          </Item>
        </CardItem>
        <CardItem style={{ marginTop: -10, borderRadius: 30 }}>
          <Item>
            <Icon name="ios-navigate" size={20} color="#0066cc" />
            <GoogleSearch
              placeholder="Destination"
              autoFocus={false}
              onPress={(data: any, details: any) => {
                locationStore.setDropOffLocation({ location: details.geometry.location })
              }}
              listView={{
                backgroundColor: 'white',
                position: 'absolute',
                top: 50,
                width: 340,
                left: -20,
              }}
            />
          </Item>
        </CardItem>
      </Card>
    )
  })
)

export default SearchBox
