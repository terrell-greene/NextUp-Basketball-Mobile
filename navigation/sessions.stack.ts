import { createStackNavigator } from 'react-navigation-stack'

import { defaultStackNavigationOptions, defaultViewStyle } from '../constants'
import Sessions from '../screens/sessions/sessions.screen'
import CreateEditSession from '../screens/create-edit-session/create-edit-session.screen'
import SessionDetails from '../screens/session-details/session-details.screen'

const SessionsStack = createStackNavigator(
  {
    Sessions,
    CreateEditSession,
    SessionDetails
  },
  {
    cardStyle: defaultViewStyle,
    defaultNavigationOptions: defaultStackNavigationOptions
  }
)

export default SessionsStack
