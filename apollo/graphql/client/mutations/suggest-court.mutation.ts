import gql from 'graphql-tag'

export const SuggestCourt = gql`
  mutation SuggestCourt(
    $name: String!
    $street: String!
    $city: String!
    $state: String!
    $zipCode: String!
    $timeZone: String!
  ) {
    suggestCourt(
      name: $name
      street: $street
      city: $city
      state: $state
      zipCode: $zipCode
      timeZone: $timeZone
    ) @client
  }
`
