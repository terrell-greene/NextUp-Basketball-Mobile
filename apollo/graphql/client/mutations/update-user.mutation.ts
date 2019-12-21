import gql from 'graphql-tag'

export const UpdateUser = gql`
  mutation UpdateUser(
    $avatarUrl: String
    $username: String
    $fullName: String
  ) {
    updateUser(username: $username, avatarUrl: $avatarUrl, fullName: $fullName)
      @client
  }
`
