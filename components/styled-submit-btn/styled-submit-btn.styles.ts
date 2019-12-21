import styled from 'styled-components/native'
import { Platform } from 'react-native'
import { Button } from 'react-native-elements'

import { colorGreen } from '../../constants'

export const StyledBtn = styled(Button).attrs(() => ({
  containerStyle: {
    width: '90%',
    marginTop: 20,
    marginBottom: 25,
    alignSelf: 'center'
  },
  buttonStyle: {
    backgroundColor: colorGreen,
    borderRadius: 100,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: Platform.OS === 'ios' ? 20 : 100
  }
}))``
