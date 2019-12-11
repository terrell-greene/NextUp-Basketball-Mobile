import React, { useRef } from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import MapView, { Marker } from 'react-native-maps'

import { GraphQL } from '../../apollo'
import { useQuery } from '@apollo/react-hooks'
import { Court } from '../../apollo/graphql/types.graphql'

const { Client } = GraphQL

const Map: NavigationStackScreenComponent = () => {
  const map = useRef<MapView>(null)

  const {
    data: { mapRegion }
  } = useQuery(Client.Query.GetMapRegion)
  const {
    data: { courts }
  } = useQuery<{ courts: Court[] }>(Client.Query.GetCourts)

  const buildMarker = (court: Court) => {
    // const routeParams: CourtSessionsRouteParams = {
    //   courtId: court.id,
    //   courtName: court.name
    // }

    return (
      <Marker
        key={court.id}
        title={court.name}
        coordinate={{
          latitude: court.coords.latitude,
          longitude: court.coords.longitude
        }}
        // onCalloutPress={() => navigate('CourtSessions', routeParams)}
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
