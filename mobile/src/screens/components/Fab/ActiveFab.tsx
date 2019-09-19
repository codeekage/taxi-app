import React from 'react'
import { View, Fab, Text, Button, Title, Toast, ActionSheet } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import { inject, observer } from 'mobx-react'
import { Alert } from 'react-native'
import { execute } from '../../Home/components/util/actionsheet.function'
//import console = require('console');

var BUTTONS = ['Executive', 'Reset', 'Close']
var DESTRUCTIVE_INDEX = 1
var CANCEL_INDEX = 2

const theme = {
  ligtBlue: {
    backgroundColor: '#0066cc',
    color: '#fff',
  },
}

/* const  = (props : any) => {
  //bookingStore.setBookings(locationStore)
  return 
} */

const ActiveAppFab = inject('componentStore', 'locationStore', 'bookingStore')(
  observer(({ componentStore, locationStore, fare, bookingStore }) => {
      const handleBooking = () => {
        bookingStore.setBookings(locationStore)
        bookingStore.setBookingStatus("pending")
      }

    return (
      <View>
        <Fab
          active={componentStore.isActive}
          direction="up"
          containerStyle={{}}
          style={[
            theme.ligtBlue,
            { height: 60, width: 150, shadowColor: 'white' },
          ]}
          position="bottomRight"
          onPress={() =>
            fare === 0
              ? Toast.show({
                  text: 'Please set your pick up location and destination😅',
                  buttonText: 'Dismiss',
                  buttonStyle: { backgroundColor: '#0066cc' },
                  position: 'top',
                  duration: 20000,
                  type: 'danger',
                })
              : componentStore.setFabActive()
          }
        >
          <Text style={{ color: 'white' }}>
            <Text
              style={{
                color: 'white',
                fontSize: 10,
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              APX. FARE.{'\n'}
            </Text>
            <Title style={{ textAlign: 'center', color: 'white' }}>
              ${fare}
            </Title>
          </Text>
          {fare !== 0 && (
            <Button
              style={[
                theme.ligtBlue,
                {
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                },
              ]}
              onPress={() => {
                ActionSheet.show(
                  {
                    options: BUTTONS,
                    cancelButtonIndex: CANCEL_INDEX,
                    destructiveButtonIndex: DESTRUCTIVE_INDEX,
                    title: 'Car Ride Class',
                  },
                  buttonIndex => {
                    execute(buttonIndex, BUTTONS, {
                      Executive: () => handleBooking(),
                      Reset: () => locationStore.resetFare(),
                      Close: () => console.log('close'),
                    })
                  }
                )
              }}
            >
              <FontAwesome name="car" color="white" size={20} />
            </Button>
          )}

          {fare !== 0 && (
            <Button
              style={[
                theme.ligtBlue,
                {
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  marginTop: 20,
                  marginBottom: 15,
                },
              ]}
              onPress={() => {
                ActionSheet.show(
                  {
                    options: BUTTONS,
                    cancelButtonIndex: CANCEL_INDEX,
                    destructiveButtonIndex: DESTRUCTIVE_INDEX,
                    title: 'Bike Ride Class',
                  },
                  buttonIndex => {
                    execute(buttonIndex, BUTTONS, {
                      Executive: () => Alert.alert('Executive'),
                      Reset: () => locationStore.resetFare(),
                      Close: () => console.log('close'),
                    })
                  }
                )
              }}
            >
              <FontAwesome name="bicycle" color="white" size={20} />
            </Button>
          )}
          {fare !== 0 && (
            <Button
              style={[
                theme.ligtBlue,
                {
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  marginBottom: 20,
                },
              ]}
              onPress={() => {
                ActionSheet.show(
                  {
                    options: BUTTONS,
                    cancelButtonIndex: CANCEL_INDEX,
                    destructiveButtonIndex: DESTRUCTIVE_INDEX,
                    title: 'Truck Ride Class',
                  },
                  buttonIndex => {
                    execute(buttonIndex, BUTTONS, {
                      Executive: () => Alert.alert('Executive'),
                      Reset: () => locationStore.resetFare(),
                      Close: () => console.log('close'),
                    })
                  }
                )
              }}
            >
              <FontAwesome name="truck" color="white" size={20} />
            </Button>
          )}
        </Fab>
      </View>
    )
  })
)

export default ActiveAppFab
