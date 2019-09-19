import React from 'react'
import {
  Card,
  CardItem,
  Thumbnail,
  Body,
  Text,
  Item,
  Right,
  Left,
  Button,
} from 'native-base'
import { Linking, Platform } from "react-native"
import { Ionicons } from '@expo/vector-icons'

const NotificationBox = ({ driver }: any) => {

  const dialCall = () => {
 
    let phoneNumber = '';
 
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${1234567890}';
    }
    else {
      phoneNumber = 'telprompt:${1234567890}';
    }
 
    Linking.openURL(phoneNumber);
  };
 

  return (
    <Card style={{ marginTop: 10, borderRadius: 20 }}>
      <CardItem style={{ marginBottom: -0.5, borderRadius: 30 }}>
        <Left>
          <Thumbnail
            circular
            source={{
              uri:
                'https://previews.123rf.com/images/yacobchuk/yacobchuk1802/yacobchuk180201227/95429838-power-pose-pleasant-grey-haired-bristled-man-folding-his-hands-across-his-chest-and-smiling-at-the-c.jpg',
            }}
          />
          <Body>
            <Text>{driver.firstname + ' ' + driver.lastname}</Text>
            <Text note>
              {driver.vehicle.color +
                ' ' +
                driver.vehicle.model +
                ' ' +
                driver.vehicle.bodyType +
                ' ' +
                driver.vehicle.plateNumber}
            </Text>
          </Body>
        </Left>
        <Right style={{ right: -25 }}>
          <Body>
            <Item style={{ padding: 0, borderBottomWidth: 0 }}>
              <Button
                success
                rounded   
                style={{
                  width: 50,
                  height: 50,
                  alignContent: 'center',
                  justifyContent: 'center',
                  margin: 3,
                }}
                onPress={dialCall}
              >
                <Ionicons
                  name="ios-call"
                  size={30}
                  color="white"
                  style={{ textAlign: 'center' }}
                />
              </Button>

              <Button
                danger
                rounded
                style={{
                  width: 50,
                  height: 50,
                  alignContent: 'center',
                  justifyContent: 'center',
                  margin: 3,
                }}
              >
                <Ionicons
                  name="ios-close"
                  size={40}
                  color="white"
                  style={{ textAlign: 'center' }}
                />
              </Button>
            </Item>
          </Body>
        </Right>
      </CardItem>
    </Card>
  )
}

export default NotificationBox
