import { createStackNavigator } from 'react-navigation-stack'
import SessionsScreen from '../screens/sessions/sessions.screen'
import { defaultStackNavigationOptions, defaultViewStyle } from '../constants'

const SessionsStack = createStackNavigator(
  {
    Sessions: {
      screen: SessionsScreen
    }
  },
  {
    cardStyle: defaultViewStyle,
    defaultNavigationOptions: defaultStackNavigationOptions
  }
)

export default SessionsStack
