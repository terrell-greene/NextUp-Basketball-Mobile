import gql from 'graphql-tag'
import UserData from '../../fragments/user.fragment'

export const Login = gql`
  mutation Login($email: Email!, $password: Password!) {
    login(data: { email: $email, password: $password }) {
      token
      user {
        ...UserData
      }
    }
  }
  ${UserData}
`
