import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ApolloProvider } from '@apollo/react-hooks'
import { AppearanceProvider } from 'react-native-appearance'
import { AppLoading } from 'expo'
import { getItemAsync } from 'expo-secure-store'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'

import { client, GraphQL } from './apollo'
import Navigator from './navigation'

const { Client } = GraphQL

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

    const locationData = (await client.cache.readQuery({
      query: Client.Query.GetUserLocation
    })) as any
    const regionData = (await client.cache.readQuery({
      query: Client.Query.GetMapRegion
    })) as any

    const newUserLocation = {
      userLocation: { ...locationData.userLocation, latitude, longitude }
    }

    const newMapRegion = {
      mapRegion: {
        ...regionData.mapRegion,
        latitude,
        longitude
      }
    }

    await client.cache.writeQuery({
      query: Client.Query.GetUserLocation,
      data: newUserLocation
    })
    await client.cache.writeQuery({
      query: Client.Query.GetMapRegion,
      data: newMapRegion
    })
  }

  const fetchCourtAndSessions = async () => {
    try {
      await client.query({
        query: Client.Query.FetchCourtsAndSessions
      })
    } catch (error) {
      console.error(JSON.stringify(error))
    }
  }

  return isReady ? (
    <AppearanceProvider>
      <ApolloProvider client={client}>
        <Navigator />
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
