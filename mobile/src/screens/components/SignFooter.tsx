import React from 'react'
import { Text, ListItem, Left, Icon, Button, Body, Right  } from 'native-base'
import { Ionicons } from '@expo/vector-icons';


interface Props{
    navigator : any 
}

const SignOutFooter = ({navigator} : Props) => {
  return (
    <ListItem icon onPress={navigator._signOutAsync} noBorder>
    <Left>
      <Button transparent danger>
        <Ionicons name="ios-unlock" size={32} color="red" />
      </Button>
    </Left>
    <Body>
      <Text style={{color: "#696969"}}>Sign Out</Text>
    </Body>
   {/*  <Right>
      <Icon active name="arrow-forward" />
    </Right> */}
  </ListItem>
  )
}

export default SignOutFooter
