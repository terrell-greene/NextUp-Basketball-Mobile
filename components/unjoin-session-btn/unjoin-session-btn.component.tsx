import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Button } from 'react-native-elements'
import { useMutation } from '@apollo/react-hooks'
import { ActivityIndicator } from 'react-native'

import { colorRed } from '../../constants'
import { Mutation } from '../../apollo'

interface UnjoinSessionBtnProps {
  sessionId: string
}

const UnjoinSessionBtn: React.FC<UnjoinSessionBtnProps> = ({ sessionId }) => {
  const [unjoinSession, { loading }] = useMutation(Mutation.UnjoinSession, {
    variables: { sessionId },
    onError: error => {
      console.error(JSON.stringify(error))
    }
  })

  const onPress = () => {
    unjoinSession()
  }

  return loading ? (
    <ActivityIndicator style={{ marginRight: 7 }} />
  ) : (
    <Button
      type="clear"
      icon={<AntDesign size={20} name="minuscircleo" color={colorRed} />}
      onPress={onPress}
    />
  )
}

export default UnjoinSessionBtn
