import { Dimensions } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'

import { defaultStackNavigationOptions, defaultViewStyle } from '../constants'
import TabNavigator from './TabNavigator'
import AuthScreen from '../screens/auth/auth.screen'
import SideDrawer from './side.drawer'

const DrawerNavigator = createDrawerNavigator(
  {
    Tab: TabNavigator
  },
  {
    contentComponent: SideDrawer,
    drawerWidth: () => {
      const screenWidth = Math.round(Dimensions.get('window').width)

      return screenWidth * 0.8
    },
    edgeWidth: 0
  }
)

const AppNavigator = createStackNavigator(
  {
    Main: {
      screen: DrawerNavigator,
      navigationOptions: { header: null }
    },
    Authentication: AuthScreen
  },
  {
    cardStyle: defaultViewStyle,
    defaultNavigationOptions: defaultStackNavigationOptions,
    headerLayoutPreset: 'center'
  }
)

export default createAppContainer(AppNavigator)
