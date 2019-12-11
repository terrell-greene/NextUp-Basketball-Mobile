import gql from 'graphql-tag'

export const GetMapRegion = gql`
  query GetMapRegion {
    mapRegion @client {
      latitude
      longitude
      latitudeDelta
      longitudeDelta
    }
  }
`
