import React from 'react'
import {
  StyledTextInputContainer,
  StyledTextInput,
  StyledLabel,
  StyledInputContainer,
  StyledErrorMessage
} from './styled-input.styles'
import { colorGrey } from '../../constants'
import { KeyboardTypeOptions } from 'react-native'

interface StyledInputProps {
  label: string
  value: string
  keyboardType?: KeyboardTypeOptions
  secureTextEntry?: boolean
  disabled: boolean
  errorMessage?: string | null
  onChangeText: (text: string) => void
}

const StyledInput: React.FC<StyledInputProps> = props => {
  const { label, disabled, errorMessage } = props
  return (
    <StyledInputContainer>
      <StyledLabel>{label}</StyledLabel>
      <StyledTextInputContainer>
        <StyledTextInput
          {...props}
          autoCapitalize="none"
          selectionColor={colorGrey}
          editable={!disabled}
        />
      </StyledTextInputContainer>
      <StyledErrorMessage errorMessage={errorMessage}>
        {errorMessage}
      </StyledErrorMessage>
    </StyledInputContainer>
  )
}

export default StyledInput
