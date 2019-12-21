import { createStackNavigator } from 'react-navigation-stack'

import { defaultStackNavigationOptions, defaultViewStyle } from '../constants'
import Sessions from '../screens/sessions/sessions.screen'
import CreateEditSession from '../screens/create-edit-session/create-edit-session.screen'
import SessionDetails from '../screens/session-details/session-details.screen'
import ProfileIcon from '../components/profile-icon/profile-icon.component'

const SessionsStack = createStackNavigator(
  {
    Sessions: {
      screen: Sessions,
      navigationOptions: { headerLeft: ProfileIcon }
    },
    CreateEditSession,
    SessionDetails
  },
  {
    cardStyle: defaultViewStyle,
    defaultNavigationOptions: defaultStackNavigationOptions,
    headerLayoutPreset: 'center'
  }
)

export default SessionsStack
