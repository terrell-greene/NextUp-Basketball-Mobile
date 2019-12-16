import gql from 'graphql-tag'
import UserData from '../../fragments/user.fragment'

export const Login = gql`
  mutation Login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      token
      user {
        ...UserData
      }
    }
  }
  ${UserData}
`
