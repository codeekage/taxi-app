import React from 'react'
import {
  Header,
  Left,
  Item,
  Right,
  Button,
  Badge,
} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { Alert } from 'react-native'

interface Props {
  onPress: any
}

const style = {
  themeBlack: {
    backgroundColor: '#0066cc',
    color: '#fff',
    icon: {
      color: '#fff',
      fontSize: 30,
    },
    option: {
      color: '#fff',
      fontSize: 25,
    },
  },
}

const AppHeader = ({ onPress }: Props) => {
  return (
    <Header style={style.themeBlack} noShadow>
      <Left>
        <Item
          style={{
            borderColor: 'transparent',
          }}
        >
          <Button
            transparent
            iconLeft
            onPress={() => Alert.alert('Analysising for your free trips')}
          >
            <Ionicons
              name="ios-notifications-outline"
              style={style.themeBlack.icon}
            />
            <Badge danger style={{ width: 10, height: 10, right: 10 }} />
          </Button>
        </Item>
      </Left>
      <Right>
        <Item
          style={{
            borderColor: 'transparent',
          }}
        >
          <Button transparent iconLeft onPress={onPress}>
            <Ionicons name="ios-log-out" style={style.themeBlack.option} />
          </Button>
        </Item>
      </Right>
    </Header>
  )
}

export default AppHeader
