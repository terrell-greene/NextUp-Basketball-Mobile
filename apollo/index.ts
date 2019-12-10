import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import ApolloClient from 'apollo-client'

import initialState from './initialState'
import { getApiUrl } from '../env'

const cache = new InMemoryCache()

cache.writeData({
  data: initialState
})

const uri = getApiUrl()

const httpLink = createUploadLink({
  uri
})

export const client = new ApolloClient({
  cache,
  link: httpLink
  //   resolvers
})

client.onResetStore(() =>
  Promise.resolve(cache.writeData({ data: initialState }))
)
