import gql from 'graphql-tag'
import UserData from '../../fragments/user.fragment'

export const GetAuth = gql`
  query Auth {
    auth @client {
      token
      user {
        ...UserData
      }
    }
  }
  ${UserData}
`
