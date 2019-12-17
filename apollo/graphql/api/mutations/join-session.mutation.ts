import gql from 'graphql-tag'
import SessionData from '../../fragments/session.fragment'

export const JoinSession = gql`
  mutation JoinSession($sessionId: ID!) {
    joinSession(input: { sessionId: $sessionId }) {
      ...SessionData
    }
  }
  ${SessionData}
`
