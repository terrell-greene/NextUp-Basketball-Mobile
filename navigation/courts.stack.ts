import { createStackNavigator } from 'react-navigation-stack'

import { defaultViewStyle, defaultStackNavigationOptions } from '../constants'
import Map from '../screens/map/map.screen'

const CourtsStack = createStackNavigator(
  {
    Map: {
      screen: Map
    }
  },
  {
    cardStyle: defaultViewStyle,
    defaultNavigationOptions: defaultStackNavigationOptions
  }
)

export default CourtsStack
