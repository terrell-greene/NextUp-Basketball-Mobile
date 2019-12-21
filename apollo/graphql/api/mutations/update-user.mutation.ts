import gql from 'graphql-tag'
import UserData from '../../fragments/user.fragment'

export const UpdateUser = gql`
  mutation UpdateUser(
    $userId: ID!
    $avatar: Upload
    $fullName: String
    $username: String
  ) {
    updateUser(
      input: {
        fullName: $fullName
        username: $username
        avatar: $avatar
        userId: $userId
      }
    ) {
      ...UserData
    }
  }
  ${UserData}
`
