import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

interface Props{
    placeholder : string,
    autoFocus : boolean,
    onPress : any
    listView : object
}

const GoogleSearch = ({placeholder, autoFocus, onPress, listView} : Props) => {
  return (
    <GooglePlacesAutocomplete
        placeholder={placeholder}
        minLength={2}
        autoFocus={autoFocus}
        returnKeyType={'done'}
        keyboardAppearance={'dark'}
        fetchDetails={true}
        renderDescription={(row : any) => row.description}
        onPress={onPress}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyBsQHTADk-AkBDtj_JG2_cL3oxABF51tdQ',
          language: 'en', // language of the results
          components:'country:ng',
        }}
        styles={{
          textInputContainer: {
            backgroundColor: "transparent",
            borderTopWidth: 0,
            borderBottomWidth: 0,
            width: '100%'
          },  
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 'auto',
            color: '#5d5d5d',
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          powered: {
            width : 0
          },
          listView
        }}
        filterReverseGeocodingByTypes={['locality', 'establishment', 'administrative_area_level_3']}
        currentLocation={false}
      />
  )
}

export default GoogleSearch
