import React from 'react'
import InActiveAppFab from './InActiveFab'
import ActiveAppFab from './ActiveFab'

const AppFab = ({ fare, notification }: any) => {
  return (
    <>{(notification.origin  && <InActiveAppFab notification={notification}/>) || <ActiveAppFab fare={fare}/>}</>
  )
}

export default AppFab
