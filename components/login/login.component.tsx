import React, { useState } from 'react'

import { LoginContainer } from './login.styles'
import StyledInput from '../styled-input/styled-input.component'
import StyledSubmitBtn from '../styled-submit-btn/styled-submit-btn.component'
import { useMutation } from '@apollo/react-hooks'
import { Mutation } from '../../apollo'
import { useNavigation } from 'react-navigation-hooks'

const Login: React.FC = () => {
  const { goBack } = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(null)

  const [login, { loading }] = useMutation(Mutation.Login, {
    onError: error => {
      const { password } = error.networkError as any

      setPasswordError(password)
    },
    onCompleted: () => goBack()
  })

  const onSubmit = async () => {
    const variables = { email, password }

    await login({ variables })
  }

  return (
    <LoginContainer>
      <StyledInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        disabled={loading}
      />
      <StyledInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        disabled={loading}
        errorMessage={passwordError}
        secureTextEntry={true}
      />
      <StyledSubmitBtn loading={loading} title="Login" onPress={onSubmit} />
    </LoginContainer>
  )
}

export default Login
