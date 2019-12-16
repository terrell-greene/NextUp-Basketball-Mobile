import gql from 'graphql-tag'
import SessionData from '../../fragments/session.fragment'

export const CreateSession = gql`
  mutation CreateSession($courtId: ID!, $start: DateTime!, $end: DateTime!) {
    createSession(input: { courtId: $courtId, start: $start, end: $end }) {
      ...SessionData
    }
  }
  ${SessionData}
`
