interface ValidateLoginArgs {
  username: string
  password: string
}

interface ValidateLoginResult {
  username: string | null
  password: string | null
}

export const validateLogin = ({
  username,
  password
}: ValidateLoginArgs): ValidateLoginResult => {
  return {
    username: validateUsername(username),
    password: validatePassword(password)
  }
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
