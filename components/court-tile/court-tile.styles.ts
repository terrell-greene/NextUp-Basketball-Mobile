import styled from 'styled-components/native'

import { colorGrey } from '../../constants'

export const CourtTileContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-color: ${colorGrey};
  border-width: 1px;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 15px;
`

export const CourtTileText = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1
}))`
  font-size: 16px;
  color: ${colorGrey};
  align-items: center;
  width: 75%;
`
export const BtnGroupContainer = styled.View`
  width: 25%;
  flex-direction: row;
`
