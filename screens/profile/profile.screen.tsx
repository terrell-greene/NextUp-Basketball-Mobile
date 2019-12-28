import React, { useState, useEffect } from 'react'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { Avatar } from 'react-native-elements'
import { ApolloError } from 'apollo-client'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { useNavigation } from 'react-navigation-hooks'

import { ProfileContainer } from './profile.styles'
import { Mutation, Query } from '../../apollo'
import StyledInput from '../../components/styled-input/styled-input.component'
import { User } from '../../apollo/graphql/types.graphql'
import { getPhoto } from '../../utils'
import StyledSubmitBtn from '../../components/styled-submit-btn/styled-submit-btn.component'

const Profile: NavigationStackScreenComponent = () => {
  const {
    data: {
      auth: { user }
    }
  } = useQuery<{ auth: { user: User } }>(Query.GetAuth)

  const { goBack } = useNavigation()

  const [avatarUrl, setAvatarUrl] = useState(null)

  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState(null)

  const [fullName, setFullName] = useState('')
  const [fullNameError, setFullNameError] = useState(null)

  useEffect(() => {
    if (user) {
      setUsername(user.username)
      setFullName(user.fullName)
      setAvatarUrl(user.avatarUrl)
    }
  }, [user])

  const [updateUser, { loading }] = useMutation(Mutation.UpdateUser, {
    onError: (error: ApolloError) => {
      const { username } = error.networkError as any

      setUsernameError(username)
    },
    onCompleted: () => goBack()
  })

  const editProfileAvatar = async () => getPhoto(setAvatarUrl)

  const onSubmit = async () => {
    const variables = {} as any

    if (avatarUrl) variables.avatarUrl = avatarUrl
    if (username !== user.username) variables.username = username
    if (fullName !== user.fullName) variables.fullName = fullName

    updateUser({ variables })
  }

  return (
    <ProfileContainer>
      <Avatar
        size={125}
        rounded
        icon={{ name: 'user', type: 'font-awesome' }}
        showEditButton
        containerStyle={{ marginBottom: 20 }}
        onEditPress={loading ? null : editProfileAvatar}
        source={
          avatarUrl
            ? {
                uri: avatarUrl
              }
            : null
        }
      />

      <StyledInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        errorMessage={usernameError}
        disabled={loading}
      />

      <StyledInput
        label="Full Name"
        value={fullName}
        onChangeText={setFullName}
        errorMessage={fullNameError}
        disabled={loading}
      />

      <StyledSubmitBtn
        title="Edit Profile"
        loading={loading}
        onPress={onSubmit}
      />
    </ProfileContainer>
  )
}

Profile.navigationOptions = {
  title: 'Profile'
}

export default Profile
