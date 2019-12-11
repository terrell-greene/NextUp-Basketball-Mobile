import gql from 'graphql-tag'
import SessionData from '../../fragments/session.fragment'
import CourtData from '../../fragments/court.fragment'

export const GetCourtsAndSessions = gql`
  query GetCourtsAndSessions {
    courts @client {
      ...CourtData
    }

    sessions @client {
      ...SessionData
    }
  }
  ${SessionData}
  ${CourtData}
`
