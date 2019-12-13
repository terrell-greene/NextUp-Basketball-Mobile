import styled from 'styled-components/native'
import { Platform } from 'react-native'

import { colorGreen } from '../../constants'

export const StyledSubmitBtnContainer = styled.View`
  width: 90%;
  margin-top: 10px;
  margin-bottom: 15px;
  background-color: ${colorGreen};
  border-radius: 100px;
  border-top-left-radius: 0;
  border-bottom-left-radius: ${Platform.OS === 'ios' ? 20 : 100};
  align-self: center;
  height: 37px;
  justify-content: center;
`
