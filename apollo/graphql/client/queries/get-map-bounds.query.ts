import gql from 'graphql-tag'

export const GetMapBounds = gql`
  query GetMapBounds {
    getMapBounds @client
  }
`
