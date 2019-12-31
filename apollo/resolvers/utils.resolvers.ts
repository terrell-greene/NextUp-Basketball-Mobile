import { ApolloCache } from 'apollo-cache'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import { setItemAsync, deleteItemAsync } from 'expo-secure-store'

import { GraphQL } from '../graphql'
import { authKey } from '../../utils'

const { Client } = GraphQL

export const updateAuthCache = async (
  data: object | null,
  cache: ApolloCache<NormalizedCacheObject>
) => {
  const updatedAuth = {
    auth:
      data === null
        ? {
            __typename: 'AuthPayload',
            token: null,
            user: null
          }
        : data
  }

  await cache.writeQuery({ query: Client.Query.GetAuth, data: updatedAuth })

  if (data === null) {
    await deleteItemAsync(authKey)
  } else {
    await setItemAsync(authKey, JSON.stringify(data))
  }
}

export const createContext = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}
