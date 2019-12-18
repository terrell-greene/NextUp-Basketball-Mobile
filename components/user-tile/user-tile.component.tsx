import React from 'react'
import { Avatar } from 'react-native-elements'

import { User } from '../../apollo/graphql/types.graphql'
import {
  UserTileContainer,
  UserTileTextContainer,
  UserTileFullName,
  UserTileUsername
} from './user-tile.styles'

interface UserTileProps {
  user: User
}

const UserTile: React.FC<UserTileProps> = ({ user }) => {
  return (
    <UserTileContainer>
      <Avatar
        rounded
        source={{
          uri: user.avatarUrl ? user.avatarUrl : undefined
        }}
        icon={{ name: 'user', type: 'font-awesome' }}
      />
      <UserTileTextContainer>
        <UserTileFullName>{user.fullName}</UserTileFullName>
        <UserTileUsername>@{user.username}</UserTileUsername>
      </UserTileTextContainer>
    </UserTileContainer>
  )
}

export default UserTile
