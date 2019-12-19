interface ValidateSuggestCourtArgs {
  courtName: string
  street: string
  city: string
  state: string
  zipCode: string
}

interface ValidateSuggestCourtResult {
  courtName: string | null
  street: string | null
  city: string | null
  state: string | null
  zipCode: string | null
  valid?: boolean
}

export const validateSuggestCourt = ({
  courtName,
  street,
  city,
  state,
  zipCode
}: ValidateSuggestCourtArgs): ValidateSuggestCourtResult => {
  const result: ValidateSuggestCourtResult = {
    courtName: validateCourtName(courtName),
    street: validateStreet(street),
    city: validateCity(city),
    state: validateState(state),
    zipCode: validateZipCode(zipCode)
  }

  let valid = true

  for (const key in result) {
    if (result[key]) valid = false
  }

  result.valid = valid

  return result
}

const validateCourtName = (courtName: string) => {
  if (!courtName.trim()) {
    return 'Court name is required'
  } else {
    return null
  }
}

const validateStreet = (street: string) => {
  if (!street.trim()) {
    return 'Street is required'
  } else {
    return null
  }
}
const validateCity = (city: string) => {
  if (!city.trim()) {
    return 'City is required'
  } else {
    return null
  }
}
const validateState = (state: string) => {
  if (!state.trim()) {
    return 'State is required'
  } else {
    return null
  }
}
const validateZipCode = (zipCode: string) => {
  if (!zipCode.trim()) {
    return 'Zip code is required'
  } else {
    return null
  }
}
