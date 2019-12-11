import gql from 'graphql-tag'

export const GetUserLocation = gql`
  query GetUserLocation {
    userLocation @client {
      latitude
      longitude
    }
  }
`
