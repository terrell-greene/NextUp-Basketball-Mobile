import styled from 'styled-components/native'

export const SuggestCourtContainer = styled.KeyboardAvoidingView.attrs(() => ({
  behavior: 'padding',
  enabled: true,
  keyboardVerticalOffset: 100
}))`
  margin-top: 10%;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`
