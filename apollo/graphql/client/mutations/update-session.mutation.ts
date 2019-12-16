import gql from 'graphql-tag'

export const UpdateSession = gql`
  mutation UpdateSession($sessionId: ID!, $start: DateTime, $end: DateTime) {
    updateSession(sessionId: $sessionId, start: $start, end: $end) @client
  }
`
