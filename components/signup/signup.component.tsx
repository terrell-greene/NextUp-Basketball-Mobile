import React, { useState } from 'react'

import { SignUpContainer } from './signup.styles'
import StyledInput from '../styled-input/styled-input.component'
import StyledSubmitBtn from '../styled-submit-btn/styled-submit-btn.component'

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('')

  const onSubmit = () => {}

  return (
    <SignUpContainer>
      <StyledInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        disabled={false}
      />
      <StyledInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        disabled={false}
      />
      <StyledInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        disabled={false}
      />
      <StyledInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        disabled={false}
      />
      <StyledInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        disabled={false}
      />
      <StyledSubmitBtn loading={false} title="Login" onPress={onSubmit} />
    </SignUpContainer>
  )
}

export default SignUp
