import styled from 'styled-components/native'
import { Button } from 'react-native-elements'

export const ProfileContainer = styled.View`
  margin-top: 10%;
  align-items: center;
`

export const LogoutBtn = styled(Button).attrs(() => ({
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
