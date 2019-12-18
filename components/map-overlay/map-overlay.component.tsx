import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { Button } from 'react-native-elements'
import { useLazyQuery } from '@apollo/react-hooks'

import { MapOverlayContainer } from './map-overlay.styles'
import { colorGreen, colorRed } from '../../constants'
import { Query } from '../../apollo'

const MapOverlay: React.FC = () => {
  const [fetchCourtsAndSessions] = useLazyQuery(Query.FetchCourtsAndSessions)
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
        icon={<MaterialIcons size={20} name="my-location" color={colorRed} />}
        onPress={() => console.log('my location')}
      />
      <Button
        type="clear"
        icon={<MaterialIcons size={20} name="refresh" color={colorGreen} />}
        onPress={() => fetchCourtsAndSessions()}
      />
    </MapOverlayContainer>
  )
}

export default MapOverlay
