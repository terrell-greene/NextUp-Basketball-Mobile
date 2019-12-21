import styled from 'styled-components/native'
import { Platform } from 'react-native'
import { colorGrey, colorRed } from '../../constants'
import { Input } from 'react-native-elements'

export const StyledTextInput = styled(Input).attrs(() => ({
  containerStyle: {
    paddingHorizontal: 0,
    marginBottom: 15,
    width: '90%',
    alignSelf: 'center'
  },
  inputContainerStyle: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderBottomWidth: 0,
    borderRadius: 100,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: Platform.OS === 'ios' ? 20 : 100
  },
  labelStyle: {
    fontWeight: '300',
    marginBottom: 5
  },
  selectionColor: colorGrey,
  autoCapitalize: 'none',
  errorStyle: {
    color: colorRed
  }
}))``
