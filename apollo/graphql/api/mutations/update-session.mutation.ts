import gql from 'graphql-tag'
import SessionData from '../../fragments/session.fragment'

export const UpdateSession = gql`
  mutation UpdateSession($sessionId: ID!, $start: DateTime, $end: DateTime) {
    updateSession(input: { sessionId: $sessionId, start: $start, end: $end }) {
      ...SessionData
    }
  }
  ${SessionData}
`
