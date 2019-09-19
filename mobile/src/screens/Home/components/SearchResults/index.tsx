import React from 'react'
import { Text } from 'react-native'
import { View, List, ListItem, Left } from 'native-base'
import styles from './SearchResults'
import { MaterialIcons } from '@expo/vector-icons'



const SearchResults = () => {
  return (
    <View style={[styles.searchResultsWrapper, { position: 'absolute' }]}>
      <List>
        <ListItem button avatar>
          <Left
            style={{
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              borderLeftColor: '#7D7D7D',
            }}
          >
            <MaterialIcons
              name="location-on"
              style={{ fontSize: 20, color: '#7D7D7D' }}
            />
          </Left>
          <Text>ListItem 1</Text>
        </ListItem>
        <ListItem>
          <Text>ListItem 2</Text>
        </ListItem>
      </List>
    </View>
  )
}

export default SearchResults
