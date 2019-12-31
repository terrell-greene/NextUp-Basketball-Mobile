import React, { useState } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { useMutation } from '@apollo/react-hooks'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { Alert, ScrollView } from 'react-native'
import momentTz from 'moment-timezone'

import { SuggestCourtContainer } from './suggest-court.styles'
import StyledInput from '../../components/styled-input/styled-input.component'
import StyledSubmitBtn from '../../components/styled-submit-btn/styled-submit-btn.component'
import { Mutation } from '../../apollo'
import { validateSuggestCourt } from './suggest-court.validation'

const SuggestCourt: NavigationStackScreenComponent = () => {
  const { goBack } = useNavigation()

  const [suggestCourt, { loading }] = useMutation(Mutation.SuggestCourt, {
    onCompleted: () => {
      Alert.alert(
        'Submitted court successfully!',
        'Please allow us some time to review the submission, and add it to the app.',
        [{ text: 'OK', onPress: () => goBack() }]
      )
    }
  })

  const [courtName, setCourtName] = useState('')
  const [courtNameError, setCourtNameError] = useState(null)

  const [street, setStreet] = useState('')
  const [streetError, setStreetError] = useState(null)

  const [city, setCity] = useState('')
  const [cityError, setCityError] = useState(null)

  const [state, setState] = useState('')
  const [stateError, setStateError] = useState(null)

  const [zipCode, setZipCode] = useState('')
  const [zipCodeError, setZipCodeError] = useState(null)

  const onSubmit = async () => {
    const result = validateSuggestCourt({
      courtName,
      street,
      city,
      state,
      zipCode
    })

    setCourtNameError(result.courtName)
    setStreetError(result.street)
    setCityError(result.city)
    setStateError(result.state)
    setZipCodeError(result.zipCode)

    if (result.valid) {
      suggestCourt({
        variables: {
          name: courtName,
          street,
          city,
          state,
          zipCode,
          timeZone: momentTz.tz.guess()
        }
      })
    }
  }

  return (
    <SuggestCourtContainer>
      <ScrollView>
        <StyledInput
          label="Court Name"
          value={courtName}
          onChangeText={setCourtName}
          errorMessage={courtNameError}
          disabled={false}
        />
        <StyledInput
          label="Street"
          value={street}
          onChangeText={setStreet}
          errorMessage={streetError}
          disabled={false}
        />
        <StyledInput
          label="City"
          value={city}
          onChangeText={setCity}
          errorMessage={cityError}
          disabled={false}
        />
        <StyledInput
          label="State"
          value={state}
          onChangeText={setState}
          errorMessage={stateError}
          disabled={false}
        />
        <StyledInput
          label="Zip Code"
          value={zipCode}
          onChangeText={setZipCode}
          errorMessage={zipCodeError}
          disabled={false}
        />

        <StyledSubmitBtn loading={loading} title="Submit" onPress={onSubmit} />
      </ScrollView>
    </SuggestCourtContainer>
  )
}

SuggestCourt.navigationOptions = {
  title: 'Submit a new court'
}

export default SuggestCourt
