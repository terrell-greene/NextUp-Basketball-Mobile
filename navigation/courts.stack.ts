import { createStackNavigator } from 'react-navigation-stack'

import { defaultViewStyle, defaultStackNavigationOptions } from '../constants'
import Map from '../screens/map/map.screen'
import CourtSessions from '../screens/court-sessions/court-sessions.sreen'
import CreateEditSession from '../screens/create-edit-session/create-edit-session.screen'
import SessionDetails from '../screens/session-details/session-details.screen'

const CourtsStack = createStackNavigator(
  {
    Map,
    CourtSessions,
    CreateEditSession,
    SessionDetails
  },
  {
    cardStyle: defaultViewStyle,
    defaultNavigationOptions: defaultStackNavigationOptions
  }
)

export default CourtsStack
