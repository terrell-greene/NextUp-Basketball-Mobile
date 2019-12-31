import React from 'react'
import { Alert, AlertButton, Platform } from 'react-native'
import { Button as BtnIcon } from 'react-native-elements'
import { useNavigation } from 'react-navigation-hooks'
import { useQuery } from '@apollo/react-hooks'
import { MaterialIcons } from '@expo/vector-icons'

import {
  ScheduleSessionLinkView,
  ScheduleSessionLinkText,
  ScheduleSessionLinkBtn
} from './schedule-session-link.styles'
import { Query } from '../../apollo'
import { colorGreen } from '../../constants'
import { CreateEditSessionRouteParams } from '../../screens/create-edit-session/create-edit-session.screen'

interface ScheduleSessionLinkProps {
  btn?: boolean
  courtInfo?: {
    courtId: string
    courtName: string
  }
}

const ScheduleSessionLink: React.FC<ScheduleSessionLinkProps> = ({
  btn,
  courtInfo
}) => {
  const { navigate } = useNavigation()

  const {
    data: {
      auth: { token }
    }
  } = useQuery(Query.GetAuth)

  const {
    data: { courts }
  } = useQuery(Query.GetCourts)

  const onPress = () => {
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
    if (courts.length === 0) {
      Alert.alert(
        'No courts!',
        'No courts have been added near you. Submit a new court, so that it can be added to the map!',
        Platform.OS === 'ios' ? iosBtns : androidBtns
      )
    } else if (token) {
      const routeParams: CreateEditSessionRouteParams = {
        courtId: courtInfo ? courtInfo.courtId : null
      }
      navigate('CreateEditSession', routeParams)
    } else {
      navigate('Authentication')
    }
  }

  return btn ? (
    <BtnIcon
      type="clear"
      onPress={onPress}
      icon={<MaterialIcons size={20} name="schedule" color={colorGreen} />}
    />
  ) : (
    <ScheduleSessionLinkView>
      <ScheduleSessionLinkText>
        No upcoming hoop sessions{' '}
        {courtInfo ? `at ${courtInfo.courtName}` : null}
      </ScheduleSessionLinkText>
      <ScheduleSessionLinkBtn title="Schedule a Session" onPress={onPress} />
    </ScheduleSessionLinkView>
  )
}

export default ScheduleSessionLink
