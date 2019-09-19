import React from 'react'
import { Container, Content } from 'native-base'

import SidebarLink from '../SidebarLink'
import ProfileHeader from '../ProfileHeader'
import SignOutFooter from '../SignFooter'

interface SideBarProps {
  navigator: any
}

export const Sidebar = ({ navigator }: SideBarProps) => {
  return (
    <Container style={{ backgroundColor: '#fff' }}>
      <ProfileHeader />
      <Content>
        <SidebarLink
          label="Promotion"
          icon="ios-medal"
          navigator={navigator._promotion}
        />
        <SidebarLink
          label="Inbox"
          icon="ios-notifications-outline"
          navigator={navigator._inbox}
        />
        <SidebarLink
          label="Wallet"
          icon="md-card"
          navigator={navigator._wallet}
        />
        <SidebarLink
          label="History"
          icon="ios-cloud-outline"
          navigator={navigator._history}
        />
        <SidebarLink
          label="Refer & Earn"
          icon="ios-trending-up"
          navigator={navigator._referEarn}
        />
        <SidebarLink
          label="Schedule Ride"
          icon="ios-watch"
          navigator={navigator._scheduleRide}
        />
        <SidebarLink
          label="Settings"
          icon="ios-cog"
          navigator={navigator._settings}
        />
        <SignOutFooter navigator={navigator} />
      </Content>
    </Container>
  )
}

export default Sidebar
