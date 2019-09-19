import React from 'react'
import { Scene, Router, Stack } from 'react-native-router-flux'
import Home from './Home'

export default class Screens extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar>
          <Scene key="home" component={Home} initial={true} />
        </Stack>
      </Router>
    )
  }
}
