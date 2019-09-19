import React from 'react'
import { View, Text, Item } from 'native-base'
import {
  ActivityIndicator,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'


export const FindDriver = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0066cc',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Item>
        <Ionicons name="ios-car" size={50} color="white" />
        <Ionicons
          name="ios-pin"
          size={50}
          color="white"
          style={{ left: -13 }}
        />
      </Item>
      <Text
        style={{
          color: 'white',
          fontSize: 23,
          marginBottom: 30,
          marginTop: 10,
        }}
      >
        please wait...
      </Text>
      <ActivityIndicator size="large" color="#00000" />
      <Text style={{ color: 'white', fontSize: 20, marginTop: 20 }}>
        Finding Driver
      </Text>
    </View>
  )
}

export default FindDriver
