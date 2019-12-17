import gql from 'graphql-tag'

export const UnjoinSession = gql`
  mutation UnjoinSession($sessionId: String!) {
    unjoinSession(sessionId: $sessionId) @client
  }
`
