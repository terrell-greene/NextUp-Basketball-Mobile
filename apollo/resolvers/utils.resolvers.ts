import { ApolloCache } from 'apollo-cache'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import { setItemAsync, deleteItemAsync } from 'expo-secure-store'

import { GraphQL } from '../graphql'

const { Client } = GraphQL

export const updateAuthCache = async (
  data: any,
  cache: ApolloCache<NormalizedCacheObject>
) => {
  const updatedAuth = {
    auth: data
  }

  await cache.writeQuery({ query: Client.Query.GetAuth, data: updatedAuth })

  if (data.token) {
    await setItemAsync('auth', JSON.stringify(data))
  } else {
    await deleteItemAsync('auth')
  }
}
