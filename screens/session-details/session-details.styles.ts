import styled from 'styled-components/native'
import { colorGrey } from '../../constants'

export const SessionDetailContainer = styled.ScrollView.attrs(props => ({
  contentContainerStyle: {
    alignItems: 'center'
  }
}))`
  padding: 25px 30px;
`
export const SectionContainer = styled.View`
  width: 100%;
  margin-bottom: 25px;
`
export const HeaderText = styled.Text`
  align-self: flex-start;
  margin-bottom: 10px;
  font-size: 20px;
  color: ${colorGrey};
`
