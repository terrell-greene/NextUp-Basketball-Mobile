import gql from 'graphql-tag'

export const UpdateAuth = gql`
  mutation UpdateAuth($auth: AuthPayload) {
    updateAuth(auth: $auth) @client
  }
`
