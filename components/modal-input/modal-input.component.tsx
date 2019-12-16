import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import {
  ModalInputContainer,
  InputContainer,
  LabelText,
  ValueText,
  ModalContainer,
  ModalChild,
  ModalBtnContainer
} from './modal-input.styles'
import { Button } from 'react-native'

interface ModalInputProps {
  label: string
  value: string
  disabled?: boolean
}

const ModalInput: React.FC<ModalInputProps> = ({
  disabled,
  label,
  value,
  children
}) => {
  const [modalVisible, setModalVisible] = useState(false)

  const onInputPress = () => {
    if (disabled) return

    setModalVisible(true)
  }

  return (
    <ModalInputContainer>
      <TouchableWithoutFeedback onPress={onInputPress}>
        <InputContainer>
          <LabelText>{label}</LabelText>
          <ValueText numberOfLines={1} ellipsizeMode="tail">
            {value}
          </ValueText>
        </InputContainer>
      </TouchableWithoutFeedback>

      <ModalContainer
        isVisible={modalVisible}
        swipeDirection="down"
        onBackdropPress={() => setModalVisible(false)}
      >
        <ModalChild>
          <ModalBtnContainer>
            <Button title="Done" onPress={() => setModalVisible(false)} />
          </ModalBtnContainer>
          {children}
        </ModalChild>
      </ModalContainer>
    </ModalInputContainer>
  )
}

export default ModalInput
