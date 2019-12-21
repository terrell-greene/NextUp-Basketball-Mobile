import React from 'react'
import { StyledTextInput } from './styled-input.styles'
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
  return <StyledTextInput {...props} />
}

export default StyledInput
