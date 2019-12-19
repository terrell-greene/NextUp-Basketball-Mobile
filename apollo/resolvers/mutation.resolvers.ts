import { ReactNativeFile } from 'apollo-upload-client'

import { GraphQL } from '../graphql'
import { Context } from './types.resolvers'
import { updateAuthCache, createContext } from './utils.resolvers'

const { Client, API } = GraphQL

export default {
  updateAuth: async (_, args, { cache }: Context) => {
    const { auth } = args

    await updateAuthCache(JSON.parse(auth), cache)
  },

  login: async (_, args, { client, cache }: Context) => {
    try {
      const result = await client.mutate({
        mutation: API.Mutation.Login,
        variables: args
      })
      const { login } = result.data

      await updateAuthCache(login, cache)
      return
    } catch (error) {
      throw error.graphQLErrors[0].data
    }
  },

  signup: async (_, args, { client, cache }: Context) => {
    const avatar = args.avatarUrl
      ? new ReactNativeFile({
          uri: args.avatarUrl,
          name: 'avatar',
          type: 'image/jpg'
        })
      : null

    try {
      const result = await client.mutate({
        mutation: API.Mutation.SignUp,
        variables: { ...args, avatar }
      })
      const { signup } = result.data
      await updateAuthCache(signup, cache)

      return
    } catch (error) {
      console.log(JSON.stringify(error))
      throw error.graphQLErrors[0].data
    }
  },

  logout: async (_, args, { client, cache }: Context) => {
    await updateAuthCache(null, cache)

    return
  },

  createSession: async (_, args, { client, cache }: Context) => {
    const {
      auth: { token }
    } = cache.readQuery({ query: Client.Query.GetAuth })

    const context = createContext(token)

    const {
      data: { createSession }
    } = await client.mutate({
      mutation: API.Mutation.CreateSession,
      variables: args,
      context
    })

    const { sessions } = await cache.readQuery({
      query: Client.Query.GetSessions
    })

    let newSessions = [...sessions, createSession]

    newSessions = newSessions.sort((a, b) => {
      const newA = new Date(a.start)
      const newB = new Date(b.start)
      return newA > newB ? 1 : newA < newB ? -1 : 0
    })

    await cache.writeQuery({
      query: Client.Query.GetSessions,
      data: { sessions: newSessions }
    })

    return
  },

  updateSession: async (_, args, { client, cache }: Context) => {
    const {
      auth: { token }
    } = cache.readQuery({ query: Client.Query.GetAuth })

    const context = createContext(token)

    await client.mutate({
      mutation: API.Mutation.UpdateSession,
      variables: args,
      context
    })

    return
  },

  joinSession: async (_, args, { client, cache }: Context) => {
    const {
      auth: { token }
    } = cache.readQuery({ query: Client.Query.GetAuth })

    const context = createContext(token)

    await client.mutate({
      mutation: API.Mutation.JoinSession,
      variables: args,
      context
    })

    return
  },

  unjoinSession: async (_, args, { client, cache }: Context) => {
    const {
      auth: { token }
    } = cache.readQuery({ query: Client.Query.GetAuth })

    const context = createContext(token)

    await client.mutate({
      mutation: API.Mutation.UnjoinSession,
      variables: args,
      context
    })

    return
  },

  updateMapRegion: async (_, args, { client, cache }: Context) => {
    cache.writeQuery({
      query: Client.Query.GetMapRegion,
      data: { mapRegion: { __typename: 'MapRegion', ...args } }
    })
  },

  suggestCourt: async (_, args, { client, cache }: Context) => {
    const {
      auth: { token }
    } = cache.readQuery({ query: Client.Query.GetAuth })
    const context = createContext(token)

    try {
      await client.mutate({
        mutation: API.Mutation.SuggestCourt,
        variables: args,
        context
      })
    } catch (error) {
      console.log(JSON.stringify(error))
    }

    return
  }
}
