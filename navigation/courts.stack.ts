import { createStackNavigator } from 'react-navigation-stack'

import { defaultViewStyle, defaultStackNavigationOptions } from '../constants'
import Map from '../screens/map/map.screen'
import CourtSessions from '../screens/court-sessions/court-sessions.sreen'

const CourtsStack = createStackNavigator(
  {
    Map,
    CourtSessions
  },
  {
    cardStyle: defaultViewStyle,
    defaultNavigationOptions: defaultStackNavigationOptions
  }
)

export default CourtsStack
