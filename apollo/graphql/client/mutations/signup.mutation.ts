import gql from 'graphql-tag'

export const SignUp = gql`
  mutation SignUp(
    $username: String!
    $avatarUrl: String
    $fullName: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signup(
      username: $username
      avatarUrl: $avatarUrl
      fullName: $fullName
      password: $password
      confirmPassword: $confirmPassword
    ) @client
  }
`
