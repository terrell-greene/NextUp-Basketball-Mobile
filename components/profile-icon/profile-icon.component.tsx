import React from 'react'
import { Avatar } from 'react-native-elements'
import { useNavigation } from 'react-navigation-hooks'
import { useQuery } from '@apollo/react-hooks'

import { Query } from '../../apollo'

const ProfileIcon: React.FC = () => {
  const { navigate } = useNavigation()
  const {
    data: {
      auth: { user }
    }
  } = useQuery(Query.GetAuth)

  return user ? (
    <Avatar
      rounded
      icon={{ name: 'user', type: 'font-awesome' }}
      source={{
        uri: user.avatarUrl ? user.avatarUrl : undefined
      }}
      onPress={() => navigate('Profile')}
    />
  ) : null
}

export default ProfileIcon
