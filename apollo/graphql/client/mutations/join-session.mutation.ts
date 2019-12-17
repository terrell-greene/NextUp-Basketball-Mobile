import gql from 'graphql-tag'

export const JoinSession = gql`
  mutation JoinSession($sessionId: String!) {
    joinSession(sessionId: $sessionId) @client
  }
`
