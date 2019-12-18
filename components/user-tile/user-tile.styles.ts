import styled from 'styled-components/native'

import { colorGrey } from '../../constants'

export const UserTileContainer = styled.View`
  flex-direction: row;
  border-color: ${colorGrey}
  border-width: 1px;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 15px;
`
export const UserTileTextContainer = styled.View`
  margin-left: 20px;
`

const UserTileText = styled.Text`
  color: ${colorGrey};
`

export const UserTileFullName = styled(UserTileText)`
  font-size: 15px;
`

export const UserTileUsername = styled(UserTileText)`
  font-size: 12px;
`
