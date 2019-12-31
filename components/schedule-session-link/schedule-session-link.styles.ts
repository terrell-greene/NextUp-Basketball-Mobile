import styled from 'styled-components/native'
import { Platform } from 'react-native'
import { Button } from 'react-native-elements'

import { colorGrey, colorGreen } from '../../constants'

export const ScheduleSessionLinkView = styled.View`
  padding-top: 50px;
`
export const ScheduleSessionLinkText = styled.Text`
  align-self: center;
  color: ${colorGrey};
  font-size: 20px;
  text-align: center;
  padding: 0 10px;
`

export const ScheduleSessionLinkBtn = styled(Button).attrs(() => ({
  containerStyle: {
    width: '50%',
    marginTop: 20,
    marginBottom: 25,
    alignSelf: 'center'
  },
  buttonStyle: {
    backgroundColor: colorGreen,
    borderRadius: 100
  }
}))``
