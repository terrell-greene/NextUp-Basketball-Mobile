import React from 'react'
import {
  CourtTileContainer,
  CourtTileText,
  BtnGroupContainer
} from './court-tile.styles'

import { Court } from '../../apollo/graphql/types.graphql'
import { Text } from 'react-native'
import DirectionsBtn from '../directions-btn/directions-btn.component'
import PhoneBtn from '../phone-btn/phone-btn.component'

interface CourtTileProps {
  court: Court
}

const CourtTile: React.FC<CourtTileProps> = ({ court }) => {
  return (
    <CourtTileContainer>
      <CourtTileText>{court.name}</CourtTileText>
      <BtnGroupContainer>
        <DirectionsBtn coords={court.coords} />
        <PhoneBtn phoneNumber={court.phone} />
      </BtnGroupContainer>
    </CourtTileContainer>
  )
}

export default CourtTile
