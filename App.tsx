import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ApolloProvider } from '@apollo/react-hooks'
import { AppearanceProvider } from 'react-native-appearance'
import { AppLoading } from 'expo'
import { getItemAsync } from 'expo-secure-store'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'

import { client } from './apollo'
import Navigator from './navigation'

export default function App() {
  const [isReady, setIsReady] = useState(false)

  const appLoad = async () => {
    await getPersistedUser()
    await getLocation()
    await fetchCourtAndSessions()
  }

  const getPersistedUser = async () => {
    const auth = await getItemAsync('auth')

    console.log(auth)
  }

  const getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      return
    }

    let {
      coords: { latitude, longitude }
    } = await Location.getCurrentPositionAsync()

    console.log(latitude, longitude)
  }

  const fetchCourtAndSessions = async () => {}

  return isReady ? (
    <AppearanceProvider>
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Navigator />
        </View>
      </ApolloProvider>
    </AppearanceProvider>
  ) : (
    <AppLoading startAsync={appLoad} onFinish={() => setIsReady(true)} />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // ...defaultViewStyle
  }
})
