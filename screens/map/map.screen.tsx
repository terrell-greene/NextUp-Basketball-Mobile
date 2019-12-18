import React, { useRef } from 'react'
import { StyleSheet } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import MapView, { Marker } from 'react-native-maps'
import { useNavigation } from 'react-navigation-hooks'
import { useQuery } from '@apollo/react-hooks'

import { Query } from '../../apollo'
import { Court } from '../../apollo/graphql/types.graphql'
import { CourtSessionsRouteParams } from '../court-sessions/court-sessions.sreen'

const Map: NavigationStackScreenComponent = () => {
  const { navigate } = useNavigation()
  const map = useRef<MapView>(null)

  const {
    data: { mapRegion }
  } = useQuery(Query.GetMapRegion)
  const {
    data: { courts }
  } = useQuery<{ courts: Court[] }>(Query.GetCourts)

  const buildMarker = (court: Court) => {
    const routeParams: CourtSessionsRouteParams = {
      courtId: court.id,
      courtName: court.name
    }

    return (
      <Marker
        key={court.id}
        title={court.name}
        coordinate={{
          latitude: court.coords.latitude,
          longitude: court.coords.longitude
        }}
        onCalloutPress={() => navigate('CourtSessions', routeParams)}
      />
    )
  }

  return (
    <MapView
      style={StyleSheet.absoluteFillObject}
      ref={map}
      initialRegion={mapRegion}
      showsUserLocation
    >
      {courts.map(court => buildMarker(court))}
    </MapView>
  )
}

export default Map
