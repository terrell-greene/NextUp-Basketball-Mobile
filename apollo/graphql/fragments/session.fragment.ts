import gql from 'graphql-tag'
import UserData from './user.fragment'
import CourtData from './court.fragment'

export default gql`
  fragment SessionData on Session {
    id
    court {
      ...CourtData
    }
    createdBy {
      ...UserData
    }
    date
    times
    start
    end
    numberAttending
    attending {
      ...UserData
    }
  }
  ${CourtData}
  ${UserData}
`
