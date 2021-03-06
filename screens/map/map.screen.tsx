import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, Alert, AlertButton, Platform } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import MapView, { Marker, Region } from 'react-native-maps'
import { useNavigation } from 'react-navigation-hooks'
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks'

import { Query, Mutation } from '../../apollo'
import { Court } from '../../apollo/graphql/types.graphql'
import { CourtSessionsRouteParams } from '../court-sessions/court-sessions.sreen'
import MapOverlay from '../../components/map-overlay/map-overlay.component'

const Map: NavigationStackScreenComponent = () => {
  const { navigate } = useNavigation()
  const [centeredOnUser, setCenteredOnUser] = useState(true)
  const map = useRef<MapView>(null)

  const [updateMapRegion] = useMutation(Mutation.UpdateMapRegion)
  const [getUserLocation, { data }] = useLazyQuery(Query.GetUserLocation)

  const {
    data: { mapRegion }
  } = useQuery(Query.GetMapRegion)
  const {
    data: { courts }
  } = useQuery<{ courts: Court[] }>(Query.GetCourts)

  useEffect(() => {
    getUserLocation()
  }, [])

  useEffect(() => {
    if (courts.length === 0) {
      const iosBtns: AlertButton[] = [
        {
          text: 'Submit a court',
          onPress: () => navigate('SuggestCourt')
        },
        {
          text: 'Cancel',
          style: 'destructive'
        }
      ]

      const androidBtns: AlertButton[] = [
        {
          text: 'Cancel',
          style: 'destructive'
        },
        {
          text: 'Submit a court',
          onPress: () => navigate('SuggestCourt')
        }
      ]

      Alert.alert(
        'No courts!',
        'No courts have been added near you. Submit a new court, so that it can be added to the map!',
        Platform.OS === 'ios' ? iosBtns : androidBtns
      )
    }
  }, [courts])

  const centerMapOnUser = async () => {
    await getUserLocation()
    const { userLocation } = data

    map.current.animateCamera({ center: userLocation })
  }

  const isCenteredOnUser = (region: Region) => {
    const { userLocation } = data
    const centered =
      region.latitude.toFixed(2) === userLocation.latitude.toFixed(2) &&
      region.longitude.toFixed(2) === userLocation.longitude.toFixed(2)

    setCenteredOnUser(centered)
  }

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
    <React.Fragment>
      <MapView
        style={StyleSheet.absoluteFillObject}
        ref={map}
        initialRegion={mapRegion}
        showsUserLocation
        onRegionChangeComplete={region =>
          updateMapRegion({ variables: region })
        }
        onRegionChange={isCenteredOnUser}
      >
        {courts.map(court => buildMarker(court))}
      </MapView>
      <MapOverlay
        centerMapOnUser={centerMapOnUser}
        centeredOnUser={centeredOnUser}
      />
    </React.Fragment>
  )
}

Map.navigationOptions = {
  title: 'Courts'
}

export default Map
