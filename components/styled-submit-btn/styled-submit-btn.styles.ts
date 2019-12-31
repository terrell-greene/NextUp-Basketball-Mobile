import styled from 'styled-components/native'
import { Platform } from 'react-native'
import { Button } from 'react-native-elements'

import { colorGreen } from '../../constants'

export const StyledBtn = styled(Button).attrs(props => {
  const { color } = props as any
  return {
    containerStyle: {
      width: '90%',
      marginTop: 20,
      marginBottom: 25,
      alignSelf: 'center'
    },
    buttonStyle: {
      backgroundColor: color ? color : colorGreen,
      borderRadius: 100,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: Platform.OS === 'ios' ? 20 : 100
    }
  }
})``
