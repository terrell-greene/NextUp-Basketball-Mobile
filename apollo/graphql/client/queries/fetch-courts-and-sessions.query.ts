import gql from 'graphql-tag'

export const FetchCourtsAndSessions = gql`
  query FetchCourtsAndSessions {
    fetchCourtsAndSessions @client
  }
`
