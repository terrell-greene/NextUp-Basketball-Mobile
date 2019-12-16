import gql from 'graphql-tag'

export const Login = gql`
  mutation Login($username: String, $password: String) {
    login(username: $username, password: $password) @client
  }
`
