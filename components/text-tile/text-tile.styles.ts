import styled from 'styled-components/native'

import { colorGrey } from '../../constants'

export const TextTileContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-color: ${colorGrey};
  margin-bottom: 15px;
`

export const TextTileText = styled.Text`
  font-size: 16px;
  color: ${colorGrey};
`
