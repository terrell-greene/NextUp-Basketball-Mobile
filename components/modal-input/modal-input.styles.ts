import styled from 'styled-components/native'
import { Appearance } from 'react-native-appearance'
import Modal from 'react-native-modal'

import { colorGrey, colorDarkGrey } from '../../constants'

const colorScheme = Appearance.getColorScheme()

export const ModalInputContainer = styled.View`
  background-color: ${colorGrey};
  margin-bottom: 10px;
  width: 90%;
  border-radius: 100px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 20px;
`

export const InputContainer = styled.View`
  border-color: ${colorDarkGrey};
  flex-direction: row;
  width: 100%;
  padding: 10px 20px;
`

const DefaultTextStyle = styled.Text`
  color: ${colorDarkGrey};
  font-size: 18px;
`

export const LabelText = styled(DefaultTextStyle)`
  width: 30%;
  text-align: left;
`

export const ValueText = styled(DefaultTextStyle)`
  width: 70%;
  text-align: right;
`

export const ModalContainer = styled(Modal)`
  margin: 0;
  justify-content: flex-end;
`
export const ModalChild = styled.SafeAreaView`
  background-color: ${colorScheme === 'light' ? colorGrey : colorDarkGrey};
`
export const ModalBtnContainer = styled.View`
  margin-right: 10px;
  align-self: flex-end;
`
