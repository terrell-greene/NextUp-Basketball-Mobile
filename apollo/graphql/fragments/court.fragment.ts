import gql from 'graphql-tag'

export default gql`
  fragment CourtData on Court {
    id
    name
    phone
    coords {
      latitude
      longitude
    }
  }
`
