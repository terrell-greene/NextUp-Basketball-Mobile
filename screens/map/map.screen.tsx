import React from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import MapView from 'react-native-maps'

const Map: NavigationStackScreenComponent = () => {
  return <MapView style={StyleSheet.absoluteFillObject}></MapView>
}

export default Map
