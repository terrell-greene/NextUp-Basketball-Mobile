import React from 'react'
import { EvilIcons, Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import { colorDarkGrey, colorGrey, colorRed } from '../constants'
import CourtsStack from './courts.stack'
import SessionsStack from './sessions.stack'

const TabNavigator = createBottomTabNavigator(
  {
    Courts: CourtsStack,
    Sessions: SessionsStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state
        const iconSize = 26

        if (routeName === 'Courts') {
          return <EvilIcons size={iconSize} name="location" color={tintColor} />
        } else if (routeName === 'Sessions') {
          return (
            <Ionicons size={iconSize} name="md-basketball" color={tintColor} />
          )
        }
      }
    }),

    tabBarOptions: {
      activeTintColor: colorRed,
      inactiveTintColor: colorGrey,
      style: { backgroundColor: colorDarkGrey }
    }
  }
)

export default TabNavigator
