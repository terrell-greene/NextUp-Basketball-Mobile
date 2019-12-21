import { createStackNavigator } from 'react-navigation-stack'

import { defaultViewStyle, defaultStackNavigationOptions } from '../constants'
import Map from '../screens/map/map.screen'
import CourtSessions from '../screens/court-sessions/court-sessions.sreen'
import CreateEditSession from '../screens/create-edit-session/create-edit-session.screen'
import SessionDetails from '../screens/session-details/session-details.screen'
import SuggestCourt from '../screens/suggest-court/suggest-court.screen'
import ProfileIcon from '../components/profile-icon/profile-icon.component'

const CourtsStack = createStackNavigator(
  {
    Map: {
      screen: Map,
      navigationOptions: { headerLeft: ProfileIcon }
    },
    CourtSessions,
    CreateEditSession,
    SessionDetails,
    SuggestCourt
  },
  {
    cardStyle: defaultViewStyle,
    defaultNavigationOptions: defaultStackNavigationOptions,
    headerLayoutPreset: 'center'
  }
)

export default CourtsStack
