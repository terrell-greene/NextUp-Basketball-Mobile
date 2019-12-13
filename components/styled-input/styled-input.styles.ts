import styled from 'styled-components/native'
import { Platform } from 'react-native'
import { colorGrey, colorRed } from '../../constants'

export const StyledInputContainer = styled.View`
  width: 90%;
  margin-bottom: 10px;
  align-self: center;
`

export const StyledTextInputContainer = styled.View`
  background-color: white;
  border-radius: 100px;
  border-top-left-radius: 0;
  border-bottom-left-radius: ${Platform.OS === 'ios' ? 20 : 100}px;
  padding: 10px;
`

export const StyledLabel = styled.Text`
  color: ${colorGrey}
  font-weight: 300;
  font-size: 16px;
  margin-bottom: 8px;
`

export const StyledTextInput = styled.TextInput`
  font-size: 16px;
`

interface StyledErrorMessageProps {
  errorMessage: string | null
}

export const StyledErrorMessage = styled.Text<StyledErrorMessageProps>`
  color: ${colorRed};
  ${({ errorMessage }) => (errorMessage ? 'margin-top: 5px;' : '')}
`
