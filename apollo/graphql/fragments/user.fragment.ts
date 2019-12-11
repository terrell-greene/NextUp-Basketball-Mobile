import gql from 'graphql-tag'

export default gql`
  fragment UserData on User {
    id
    username
    fullName
    avatarUrl
  }
`
