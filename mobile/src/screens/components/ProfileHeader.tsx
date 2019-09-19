import React from 'react'
import {
  Text,
  Header,
  List,
  Thumbnail,
  ListItem,
  Left,
  Body,
  Icon,
  Col,
  Row,
  View,
  Subtitle,
} from 'native-base'


const style = {
  icon : {
    color: '#D4AF37', 
    fontSize: 20
  }
}

const ProfileHeader = () => {
  //blue header color code : #0066cc
  return (
    <Header span style={{ backgroundColor: '#fff', color: '#0066cc' }}>
      <Left style={{ marginTop: 15, left: -10 }}>
        <List>
          <ListItem avatar>
            <Left>
              <Thumbnail
                circular
                style={{ borderWidth: 1, borderColor: 'grey' }}
                source={require('../../assets/images/user.jpg')}
              />
              <Body>
                <Text
                  style={{
                    color: '#0066cc',
                    fontSize: 20,
                    textAlign: 'left',
                    fontWeight: '500',
                  }}
                >
                  Jon Doe
                </Text>
                <Row style={{ flex: 1, paddingTop: 6, paddingBottom: 6 }}>
                  <Text style={{ fontSize: 15, fontWeight: '500' }}>
                    500 <Text note>Trips</Text>
                  </Text>
                  <Text style={{ fontSize: 20, right: -30, fontWeight: '300' }}>
                    <Text note style={{letterSpacing : 5}}>
                      <Icon
                        active
                        name="star"
                        style={style.icon}
                      />
                      <Icon
                        active
                        name="star"
                        style={style.icon}
                      />
                      <Icon
                        active
                        name="star"
                        style={style.icon}
                      />
                      <Icon
                        active
                        name="star"
                        style={style.icon}
                      />
                      <Icon
                        active
                        name="star-half"
                        style={style.icon}
                      />
                    </Text>
                  </Text>
                </Row>

              </Body>
            </Left>
          </ListItem>
        </List>
      </Left>
    </Header>
  )
}

export default ProfileHeader
