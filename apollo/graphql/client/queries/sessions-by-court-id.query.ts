import gql from 'graphql-tag'
import SessionData from '../../fragments/session.fragment'

export const SessionsByCourtId = gql`
  query SessionsByCourtId($courtId: ID!) {
    sessionsByCourtId(courtId: $courtId) @client {
      ...SessionData
    }
  }
  ${SessionData}
`
