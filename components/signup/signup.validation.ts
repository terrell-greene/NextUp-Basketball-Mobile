interface ValidateSignUpArgs {
  username: string
  fullName: string
  password: string
  confirmPassword: string
}

interface ValidateSignUpResult {
  username: string | null
  fullName: string | null
  password: string | null
  confirmPassword: string | null
  valid?: boolean
}

export const validateSignUp = ({
  username,
  fullName,
  password,
  confirmPassword
}: ValidateSignUpArgs): ValidateSignUpResult => {
  const result: ValidateSignUpResult = {
    username: validateUsername(username),
    fullName: validateFullName(fullName),
    password: validatePassword(password),
    confirmPassword: validateConfirmPassword(password, confirmPassword)
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

const validateFullName = (fullName: string) => {
  if (!fullName.trim()) {
    return 'Full name is required'
  } else {
    return null
  }
}

const validatePassword = (password: string) => {
  if (!password.trim()) {
    return 'Password is required'
  } else if (password.length < 8) {
    return 'Password length must be at 8 characters long'
  } else {
    return null
  }
}

const validateConfirmPassword = (password: string, confirmPassword: string) => {
  if (!confirmPassword.trim()) {
    return 'Confrim password is required'
  } else if (password !== confirmPassword) {
    return 'Passwords do not match'
  } else {
    return null
  }
}
