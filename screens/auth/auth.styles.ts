import styled from 'styled-components/native'
import { Button } from 'react-native-elements'

export const AuthContainer = styled.KeyboardAvoidingView.attrs(() => ({
  behavior: 'padding',
  enabled: true,
  keyboardVerticalOffset: 100
}))`
  flex-direction: column;
  justify-content: center;
`

export const SwitchViewBtn = styled(Button).attrs(() => ({
  titleStyle: {
    fontSize: 21
  },
  containerStyle: {
    alignSelf: 'flex-end',
    marginRight: 30,
    marginBottom: 50
  },
  type: 'clear'
}))``
