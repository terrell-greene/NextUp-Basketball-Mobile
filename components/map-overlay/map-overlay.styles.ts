import styled from 'styled-components/native'

import { colorDarkGrey, colorGrey } from '../../constants'

export const MapOverlayContainer = styled.View`
  position: absolute;
  top: 3%;
  right: 3%;
  padding: 5px;
  background-color: ${colorDarkGrey}
  border-width: 1px;
  border-color: ${colorGrey}
  border-radius: 10px;
`
