import gql from 'graphql-tag'
import SessionData from '../../fragments/session.fragment'

export const GetSessions = gql`
  query GetSessions {
    sessions @client {
      ...SessionData
    }
  }
  ${SessionData}
`
