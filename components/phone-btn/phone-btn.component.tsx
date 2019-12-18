import React from 'react'
import { Button } from 'react-native-elements'
import { Linking } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { colorGreen } from '../../constants'

interface PhoneBtnProps {
  phoneNumber: string
}

const PhoneBtn: React.FC<PhoneBtnProps> = ({ phoneNumber }) => {
  const onPress = () => Linking.openURL(`tel:${phoneNumber}`)

  return (
    <Button
      type="clear"
      icon={<AntDesign size={20} name="phone" color={colorGreen} />}
      onPress={onPress}
    />
  )
}

export default PhoneBtn
