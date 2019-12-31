import styled from 'styled-components/native'
import { colorGrey } from '../../constants'
import { Dimensions } from 'react-native'

export const ScrollContainer = styled.ScrollView.attrs(props => ({
  contentContainerStyle: {
    alignItems: 'center'
  }
}))`
  padding: 75px 0;
`

export const CourtPicker = styled.Picker.attrs(props => ({
  itemStyle: {
    color: 'black'
  }
}))`
  width: 100%;
`

export const AndroidPickerContainer = styled.View`
  flex-direction: row;
  background-color: ${colorGrey};
  margin-bottom: 20px;
  border-radius: 100px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 100px;
  width: ${Dimensions.get('screen').width * 0.9}px;
  align-items: center;
  padding: 0 10px;
  min-height: 50px;
`

export const AndroidPickerLabel = styled.Text`
  width: 30%;
  font-size: 18px;
`

export const AndroidPickerValue = styled.Text`
  width: 70%;
  font-size: 18px;
  text-align: right;
  padding-right: 10px;
`

export const AndroidCourtPicker = styled.Picker.attrs(props => ({
  itemStyle: {
    fontSize: 18
  },
  prompt: 'Select a court'
}))`
  width: 70%;
`
