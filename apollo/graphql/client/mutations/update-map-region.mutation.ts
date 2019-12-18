import gql from 'graphql-tag'

export const UpdateMapRegion = gql`
  mutation UpdateMapRegion(
    $latitude: Float!
    $longitude: Float!
    $latitudeDelta: Float!
    $longitudeDelta: Float!
  ) {
    updateMapRegion(
      latitude: $latitude
      longitude: $longitude
      latitudeDelta: $latitudeDelta
      longitudeDelta: $longitudeDelta
    ) @client
  }
`
