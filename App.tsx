import React, { useState } from 'react'
import { AppLoading } from 'expo'
import { StyleSheet, Text, View } from 'react-native'
import { ApolloProvider } from '@apollo/react-hooks'
import { AppearanceProvider } from 'react-native-appearance'

import { client } from './apollo'
import { defaultViewStyle } from './constants'
import Navigator from './navigation'

export default function App() {
  const [isReady, setIsReady] = useState(false)

  const appLoad = async () => {}

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
