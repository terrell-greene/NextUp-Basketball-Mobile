import React, { useState, useEffect } from 'react'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { Avatar } from 'react-native-elements'
import { ApolloError } from 'apollo-client'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { useNavigation } from 'react-navigation-hooks'

import { ProfileContainer, LogoutBtn } from './profile.styles'
import { Mutation, Query } from '../../apollo'
import StyledInput from '../../components/styled-input/styled-input.component'
import { User } from '../../apollo/graphql/types.graphql'
import { getPhoto } from '../../utils'
import StyledSubmitBtn from '../../components/styled-submit-btn/styled-submit-btn.component'
import { colorBlue } from '../../constants'

const Profile: NavigationStackScreenComponent = () => {
  const {
    data: {
      auth: { user }
    }
  } = useQuery<{ auth: { user: User } }>(Query.GetAuth)

  const { goBack } = useNavigation()

  const [profileEdited, setProfileEdited] = useState(false)

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

  useEffect(() => {
    if (user) {
      if (
        fullName !== user.fullName ||
        username !== user.username ||
        avatarUrl !== user.avatarUrl
      ) {
        setProfileEdited(true)
      } else {
        setProfileEdited(false)
      }
    }
  }, [user, fullName, username, avatarUrl])

  const [logout, { loading: logoutLoading }] = useMutation(Mutation.Logout, {
    onCompleted: () => goBack()
  })

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
        title="Save Changes"
        loading={loading}
        color={colorBlue}
        disabled={!profileEdited}
        onPress={onSubmit}
      />
      <LogoutBtn
        title="or Logout"
        onPress={() => logout()}
        loading={logoutLoading}
      />
    </ProfileContainer>
  )
}

Profile.navigationOptions = {
  title: 'Profile'
}

export default Profile
