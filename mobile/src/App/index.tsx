import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import Screens from '../screens'
import store from '../mobx-store'

export default class AppContainer extends Component {
  render() {
    return (
      <Provider {...store}>
        <Screens />
      </Provider>
    )
  }
}
