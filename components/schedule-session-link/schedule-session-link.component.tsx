import React from 'react'
import { Button } from 'react-native'
import { Button as BtnIcon } from 'react-native-elements'
import { useNavigation } from 'react-navigation-hooks'
import { useQuery } from '@apollo/react-hooks'
import { MaterialIcons } from '@expo/vector-icons'

import {
  ScheduleSessionLinkView,
  ScheduleSessionLinkText,
  ScheduleSessionLinkBtnContainer
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

  const onPress = () => {
    if (token) {
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
      <ScheduleSessionLinkBtnContainer>
        <Button
          title="Schedule a Session"
          onPress={onPress}
          color="white"
        ></Button>
      </ScheduleSessionLinkBtnContainer>
    </ScheduleSessionLinkView>
  )
}

export default ScheduleSessionLink
