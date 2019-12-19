import gql from 'graphql-tag'
import UserData from '../../fragments/user.fragment'

export const SignUp = gql`
  mutation SignUp(
    $fullName: String!
    $username: String!
    $password: Password!
    $confirmPassword: Password!
    $avatar: Upload
  ) {
    signup(
      input: {
        fullName: $fullName
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        avatar: $avatar
      }
    ) {
      token
      user {
        ...UserData
      }
    }
  }
  ${UserData}
`
