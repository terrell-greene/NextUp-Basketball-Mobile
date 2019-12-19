import React, { useState } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { useMutation } from '@apollo/react-hooks'
import { ApolloError } from 'apollo-client'

import { SignUpContainer } from './signup.styles'
import StyledInput from '../styled-input/styled-input.component'
import StyledSubmitBtn from '../styled-submit-btn/styled-submit-btn.component'
import { validateSignUp } from './signup.validation'
import { Avatar } from 'react-native-elements'
import { getPhoto } from '../../utils'
import { Mutation } from '../../apollo'

const SignUp: React.FC = () => {
  const { goBack } = useNavigation()

  const [signup, { loading }] = useMutation(Mutation.SignUp, {
    onError: (error: ApolloError) => {
      const { username } = error.networkError as any

      setUsernameError(username)
    },
    onCompleted: () => goBack()
  })

  const [avatarUrl, setAvatarUrl] = useState(undefined)

  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState(null)

  const [fullName, setFullName] = useState('')
  const [fullNameError, setFullNameError] = useState(null)

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(null)

  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState(null)

  const editProfileAvatar = async () => getPhoto(setAvatarUrl)

  const onSubmit = () => {
    const result = validateSignUp({
      username,
      fullName,
      password,
      confirmPassword
    })

    setUsernameError(result.username)
    setFullNameError(result.fullName)
    setPasswordError(result.password)
    setConfirmPasswordError(result.confirmPassword)

    if (result.valid) {
      const variables = {
        avatarUrl,
        username,
        fullName,
        password,
        confirmPassword
      }

      signup({ variables })
    }
  }

  return (
    <SignUpContainer>
      <Avatar
        size="xlarge"
        rounded
        icon={{ name: 'user', type: 'font-awesome' }}
        showEditButton
        containerStyle={{ marginBottom: 20 }}
        onEditPress={loading ? null : editProfileAvatar}
        source={{
          uri: avatarUrl
        }}
      />

      <StyledInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        errorMessage={usernameError}
        disabled={false}
      />

      <StyledInput
        label="Full Name"
        value={fullName}
        onChangeText={setFullName}
        errorMessage={fullNameError}
        disabled={false}
      />

      <StyledInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        errorMessage={passwordError}
        disabled={false}
        secureTextEntry
      />

      <StyledInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        errorMessage={confirmPasswordError}
        disabled={false}
        secureTextEntry
      />

      <StyledSubmitBtn loading={false} title="Sign Up" onPress={onSubmit} />
    </SignUpContainer>
  )
}

export default SignUp
