import React from 'react'
import { View, Text  } from 'native-base'
import { inject, observer } from 'mobx-react'
//import console = require('console');

const InActiveAppFab = inject(
  'componentStore',
  'locationStore',
  'bookingStore'
)(
  observer(({ bookingStore  }) => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 3,
          alignContent: 'center',
          alignSelf: 'center',
          borderRadius: 50,
          backgroundColor: '#0066cc',
          width: 70,
          height: 70,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            justifyContent: 'center',
            top: 15,
          }}
        >
          <Text style={{ color: 'white' }}>15 KM {'\n'} OUT</Text>
        </Text>
      </View>
    )
  })
)

export default InActiveAppFab
