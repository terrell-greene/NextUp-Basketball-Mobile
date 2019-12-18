import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { defaultStackNavigationOptions, defaultViewStyle } from '../constants'
import TabNavigator from './TabNavigator'
import AuthScreen from '../screens/auth/auth.screen'

const AppNavigator = createStackNavigator(
  {
    Tabs: {
      screen: TabNavigator,
      navigationOptions: { header: null }
    },
    Authentication: AuthScreen
  },
  {
    cardStyle: defaultViewStyle,
    defaultNavigationOptions: defaultStackNavigationOptions
  }
)

export default createAppContainer(AppNavigator)
