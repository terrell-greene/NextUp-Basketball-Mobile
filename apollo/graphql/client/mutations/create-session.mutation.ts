import gql from 'graphql-tag'

export const CreateSession = gql`
  mutation CreateSession($courtId: ID!, $start: DateTime!, $end: DateTime!) {
    createSession(courtId: $courtId, start: $start, end: $end) @client
  }
`
