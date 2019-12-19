import React, { useEffect, useState } from 'react'
import { Animated } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Button } from 'react-native-elements'
import { useLazyQuery } from '@apollo/react-hooks'

import { MapOverlayContainer } from './map-overlay.styles'
import { colorGreen, colorRed } from '../../constants'
import { Query } from '../../apollo'
import RotateView from '../rotate-view/rotate-view.component'

interface MapOverlayProps {
  centerMapOnUser: () => void
  centeredOnUser: boolean
}

const MapOverlay: React.FC<MapOverlayProps> = ({
  centerMapOnUser,
  centeredOnUser
}) => {
  const [fetchCourtsAndSessions, { loading }] = useLazyQuery(
    Query.FetchCourtsAndSessions
  )

  return (
    <MapOverlayContainer>
      <Button
        type="clear"
        icon={
          <MaterialIcons size={20} name="add-location" color={colorGreen} />
        }
        onPress={() => console.log('add location')}
      />
      <Button
        type="clear"
        icon={
          <MaterialIcons
            size={20}
            name={centeredOnUser ? 'my-location' : 'location-searching'}
            color={colorRed}
          />
        }
        onPress={centerMapOnUser}
      />
      <RotateView rotate={loading}>
        <Button
          type="clear"
          icon={<MaterialIcons size={20} name="refresh" color={colorGreen} />}
          onPress={() => fetchCourtsAndSessions()}
        />
      </RotateView>
    </MapOverlayContainer>
  )
}

export default MapOverlay
