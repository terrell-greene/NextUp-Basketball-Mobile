import { GraphQL } from '../graphql'
import { Context } from './types.resolvers'
import { updateAuthCache } from './utils.resolvers'

const { API } = GraphQL

export default {
  updateAuth: async (_, args, { client, cache }: Context) => {
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

      console.log(login)

      await updateAuthCache(login, cache)
      return
    } catch (error) {
      throw error.graphQLErrors[0].data
    }
  }
}
