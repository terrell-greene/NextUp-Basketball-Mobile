import gql from 'graphql-tag'

export const FetchSessions = gql`
  query FetchSessions {
    fetchSessions @client
  }
`
