import gql from 'graphql-tag'
import SessionData from '../../fragments/session.fragment'
import CourtData from '../../fragments/court.fragment'

export const CourtsAndSessions = gql`
  query CourtsAndSessions(
    $latitude_lte: Float!
    $latitude_gte: Float!
    $longitude_lte: Float!
    $longitude_gte: Float!
  ) {
    courts(
      where: {
        latitude: { lte: $latitude_lte, gte: $latitude_gte }
        longitude: { lte: $longitude_lte, gte: $longitude_gte }
      }
    ) {
      ...CourtData
    }

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
  ${CourtData}
`
