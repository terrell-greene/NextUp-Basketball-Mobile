import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { defaultStackNavigationOptions } from '../constants'
import TabNavigator from './TabNavigator'
import AuthScreen from '../screens/auth/auth.screen'
import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'

const AppNavigator = createStackNavigator(
  {
    Tabs: {
      screen: TabNavigator,
      navigationOptions: { header: null }
    },
    Authentication: AuthScreen
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions
  }
)

export default createAppContainer(AppNavigator)

// class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Home!</Text>
//       </View>
//     )
//   }
// }

// class SettingsScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Settings!</Text>
//       </View>
//     )
//   }
// }

// const TabNavigator = createBottomTabNavigator({
//   Home: HomeScreen,
//   Settings: SettingsScreen
// })

// export default createAppContainer(TabNavigator)
