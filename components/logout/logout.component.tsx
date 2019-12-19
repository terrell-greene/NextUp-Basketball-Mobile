import React from 'react'
import { Button } from 'react-native-elements'
import { useNavigation } from 'react-navigation-hooks'
import { useMutation } from '@apollo/react-hooks'

import { Mutation } from '../../apollo'

const Logout: React.FC = () => {
  const { closeDrawer } = useNavigation()
  const [logout] = useMutation(Mutation.Logout)

  return (
    <Button
      title="Logout"
      onPress={async () => {
        await logout()
        closeDrawer()
      }}
    />
  )
}

export default Logout
