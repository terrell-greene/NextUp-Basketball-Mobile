import React from 'react'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { View, Text } from 'react-native'
import { colorGrey } from '../../constants'

const SessionsScreen: NavigationStackScreenComponent = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text style={{ color: colorGrey }}>Hello, World!</Text>
    </View>
  )
}

export default SessionsScreen
