import styled from 'styled-components/native'

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
