import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Button } from 'react-native-elements'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { ActivityIndicator } from 'react-native'

import { colorGreen } from '../../constants'
import { Mutation, Query } from '../../apollo'
import { useNavigation } from 'react-navigation-hooks'

interface JoinSessionBtnProps {
  sessionId: string
}

const JoinSessionBtn: React.FC<JoinSessionBtnProps> = ({ sessionId }) => {
  const { navigate } = useNavigation()
  const {
    data: {
      auth: { token }
    }
  } = useQuery(Query.GetAuth)

  const [joinSession, { loading }] = useMutation(Mutation.JoinSession, {
    variables: { sessionId },
    onError: error => {
      console.error(JSON.stringify(error))
    }
  })

  const onPress = async () => {
    if (token) {
      await joinSession()
    } else {
      navigate('Authentication')
    }
  }

  return loading ? (
    <ActivityIndicator style={{ marginRight: 7 }} />
  ) : (
    <Button
      type="clear"
      icon={<AntDesign size={20} name="pluscircleo" color={colorGreen} />}
      onPress={onPress}
    />
  )
}

export default JoinSessionBtn
