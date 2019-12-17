import gql from 'graphql-tag'
import SessionData from '../../fragments/session.fragment'

export const UnjoinSession = gql`
  mutation UnjoinSession($sessionId: ID!) {
    unjoinSession(input: { sessionId: $sessionId }) {
      ...SessionData
    }
  }
  ${SessionData}
`
