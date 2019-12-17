import gql from 'graphql-tag'
import SessionData from '../../fragments/session.fragment'

export const Sessions = gql`
  query Client_Sessions(
    $latitude_lte: Float!
    $latitude_gte: Float!
    $longitude_lte: Float!
    $longitude_gte: Float!
  ) {
    sessions(
      where: {
        latitude: { lte: $latitude_lte, gte: $latitude_gte }
        longitude: { lte: $longitude_lte, gte: $longitude_gte }
      }
    ) {
      ...SessionData
    }
  }
  ${SessionData}
`
