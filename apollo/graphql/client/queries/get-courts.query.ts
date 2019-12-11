import gql from 'graphql-tag'
import CourtData from '../../fragments/court.fragment'

export const GetCourts = gql`
  query GetCourts {
    courts @client {
      ...CourtData
    }
  }
  ${CourtData}
`
