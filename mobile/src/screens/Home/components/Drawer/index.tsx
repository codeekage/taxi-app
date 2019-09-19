import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Drawer } from 'native-base'
import AppHeader from '../../../components/Header'
import SideBar from '../../../components/_partials/_sidebar'
import Props from './props'
import { inject, observer } from 'mobx-react'
import { autorun } from 'mobx'

@inject('componentStore')
@observer
export default class DrawerComponent extends Component<Props> {
  drawer: any

  _toggleDrawer() {
    const toggle = this.props.componentStore.isToggled
    this.props.componentStore.setSideToggle()
    toggle !== true ? this._closeDrawer() : this._openDrawer()
  }
  _closeDrawer() {
    StatusBar.setBarStyle('light-content')
    this.drawer._root.close()
  }
  
  _openDrawer() {
    StatusBar.setBarStyle('dark-content')
    this.drawer._root.open()
  }

  componentDidMount() {
    autorun(() =>
      console.log('drawer', this.props.componentStore.sideBarToggled)
    )
  }

  render() {
    return (
      <Drawer
        ref={c => {
          this.drawer = c
        }}
        content={<SideBar navigator={() => console.log('Pressed')} />}
        onClose={() => this._toggleDrawer()}
      >
        <AppHeader onPress={() => this._toggleDrawer()} />
        {this.props.children}
      </Drawer>
    )
  }
}
