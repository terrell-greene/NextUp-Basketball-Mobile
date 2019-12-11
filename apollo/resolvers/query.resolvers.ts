import { GraphQL } from '../graphql'
import { Context } from './types.resolvers'

const { Client, API } = GraphQL

export default {
  fetchCourtsAndSessions: async (_, args, { client, cache }: Context) => {
    const {
      data: { getMapBounds }
    } = await client.query({
      query: Client.Query.GetMapBounds,
      fetchPolicy: 'no-cache'
    })

    const { data } = await client.query({
      query: API.Query.CourtsAndSessions,
      variables: getMapBounds,
      fetchPolicy: 'network-only'
    })

    cache.writeQuery({
      query: Client.Query.GetCourtsAndSessions,
      data
    })
  },

  getMapBounds: async (_, args, { cache }: Context) => {
    const {
      mapRegion: { latitude, latitudeDelta, longitude, longitudeDelta }
    } = await cache.readQuery({
      query: Client.Query.GetMapRegion
    })

    return {
      latitude_lte: latitude + latitudeDelta,
      latitude_gte: latitude - latitudeDelta,
      longitude_lte: longitude + longitudeDelta,
      longitude_gte: longitude - longitudeDelta
    }
  }
}
