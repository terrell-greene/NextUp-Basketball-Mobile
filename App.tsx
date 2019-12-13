import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import { ApolloProvider } from '@apollo/react-hooks'
import { AppearanceProvider } from 'react-native-appearance'
import { AppLoading } from 'expo'
import { getItemAsync } from 'expo-secure-store'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'

import { client, Query, Mutation } from './apollo'
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

    client.mutate({ mutation: Mutation.UpdateAuth, variables: { auth } })
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
      query: Query.GetUserLocation
    })) as any
    const regionData = (await client.cache.readQuery({
      query: Query.GetMapRegion
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
      query: Query.GetUserLocation,
      data: newUserLocation
    })
    await client.cache.writeQuery({
      query: Query.GetMapRegion,
      data: newMapRegion
    })
  }

  const fetchCourtAndSessions = async () => {
    try {
      await client.query({
        query: Query.FetchCourtsAndSessions
      })
    } catch (error) {
      console.error(JSON.stringify(error))
    }
  }

  return isReady ? (
    <AppearanceProvider>
      <ApolloProvider client={client}>
        <StatusBar barStyle="light-content" />
        <Navigator />
      </ApolloProvider>
    </AppearanceProvider>
  ) : (
    <AppLoading startAsync={appLoad} onFinish={() => setIsReady(true)} />
  )
}
