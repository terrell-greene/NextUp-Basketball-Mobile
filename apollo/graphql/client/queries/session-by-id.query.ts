import gql from 'graphql-tag'
import SessionData from '../../fragments/session.fragment'

export const SessionById = gql`
  query SessionsByCourtId($sessionId: ID!) {
    sessionById(sessionId: $sessionId) @client {
      ...SessionData
    }
  }
  ${SessionData}
`
