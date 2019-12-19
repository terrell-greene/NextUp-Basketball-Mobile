interface ValidateLoginArgs {
  username: string
  password: string
}

interface ValidateLoginResult {
  username: string | null
  password: string | null
  valid?: boolean
}

export const validateLogin = ({
  username,
  password
}: ValidateLoginArgs): ValidateLoginResult => {
  const result: ValidateLoginResult = {
    username: validateUsername(username),
    password: validatePassword(password)
  }
  let valid = true

  for (const key in result) {
    if (result[key]) valid = false
  }

  result.valid = valid

  return result
}

const validateUsername = (username: string) => {
  if (!username.trim()) {
    return 'Username is required'
  } else {
    return null
  }
}

const validatePassword = (password: string) => {
  if (!password.trim()) {
    return 'Password is required'
  } else {
    return null
  }
}
