import styled from 'styled-components/native'
import { ListItem } from 'react-native-elements'

import { colorGrey } from '../../constants'

export const ListItemContainer = styled(ListItem).attrs(() => ({
  bottomDivider: true,
  containerStyle: { backgroundColor: 'transparent' },
  titleStyle: { color: colorGrey }
}))``

export const ListItemText = styled.Text`
  color: ${colorGrey};
`
