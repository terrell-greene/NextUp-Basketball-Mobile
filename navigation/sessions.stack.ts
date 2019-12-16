import { createStackNavigator } from 'react-navigation-stack'

import { defaultStackNavigationOptions, defaultViewStyle } from '../constants'
import Sessions from '../screens/sessions/sessions.screen'
import CreateEditSession from '../screens/create-edit-session/create-edit-session.screen'

const SessionsStack = createStackNavigator(
  {
    Sessions,
    CreateEditSession
  },
  {
    cardStyle: defaultViewStyle,
    defaultNavigationOptions: defaultStackNavigationOptions
  }
)

export default SessionsStack
