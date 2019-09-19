import React from "react";
import {ListItem, Left, Icon, Button, Body, Right, Text } from 'native-base';
import { Ionicons } from "@expo/vector-icons";


interface Props{
  navigator : any,
  icon: string,
  label : string,
  color?:string 
}

const SideBarLink = ({navigator, icon, label, color} : Props) => {
    return(
        <ListItem icon onPress={navigator} style={{height: 50, borderColor: "transparent"}} activeOpacity={8} noBorder>
        <Left>
          <Button transparent>
            <Ionicons name={icon} color="#0066cc" size={25} adjustsFontSizeToFit/>
          </Button>
        </Left>
        <Body>
          <Text style={{color : "#000"}}>{label}</Text>
        </Body>
      {/*   <Right style={{height: 52}}>
          <Icon style={{color : "#696969"}} name="arrow-forward" />
        </Right> */}
      </ListItem>
    )
}
export default SideBarLink