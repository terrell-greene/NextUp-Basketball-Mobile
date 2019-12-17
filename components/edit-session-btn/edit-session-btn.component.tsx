import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Button } from 'react-native-elements'

import { colorBlue } from '../../constants'
import { CreateEditSessionRouteParams } from '../../screens/create-edit-session/create-edit-session.screen'
import { useNavigation } from 'react-navigation-hooks'

interface EditSessionBtnProps {
  sessionId: string
  courtId: string
}

const EditSessionBtn: React.FC<EditSessionBtnProps> = ({
  sessionId,
  courtId
}) => {
  const { navigate } = useNavigation()

  const routeParams: CreateEditSessionRouteParams = {
    sessionId,
    courtId
  }

  const onPress = () => navigate('CreateEditSession', routeParams)

  return (
    <Button
      type="clear"
      icon={
        <MaterialCommunityIcons
          size={20}
          name="circle-edit-outline"
          color={colorBlue}
        />
      }
      onPress={onPress}
    />
  )
}

export default EditSessionBtn
