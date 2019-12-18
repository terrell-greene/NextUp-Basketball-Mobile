import React from 'react'
import { Button } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import { useQuery } from '@apollo/react-hooks'
import { Linking, ActionSheetIOS } from 'react-native'

import { colorGreen } from '../../constants'
import { Query } from '../../apollo'

interface DirectionsBtnProps {
  coords: { latitude: number; longitude: number }
}

const DirectionsBtn: React.FC<DirectionsBtnProps> = ({ coords }) => {
  const {
    data: { userLocation }
  } = useQuery(Query.GetUserLocation)

  const originString = `${userLocation.latitude},${userLocation.longitude}`
  const destString = `${coords.latitude},${coords.longitude}`

  const appleMapsUrl = `http://maps.apple.com/?saddr=${originString}&daddr=${destString}`
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${originString}&destination=${destString}&travelmode=driving`
  const wazeMapsUrl = `https://www.waze.com/ul?ll=${coords.latitude}%2C${coords.longitude}`

  const onPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Waze', 'Apple Maps', 'Google Maps'],
        cancelButtonIndex: 0
      },
      index => {
        switch (index) {
          case 1:
            return Linking.openURL(wazeMapsUrl)

          case 2:
            return Linking.openURL(appleMapsUrl)

          case 3:
            return Linking.openURL(googleMapsUrl)
        }
      }
    )
  }
  return (
    <Button
      type="clear"
      icon={<MaterialIcons size={20} name="directions" color={colorGreen} />}
      onPress={onPress}
    />
  )
}

export default DirectionsBtn
