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
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

interface ScheduleSessionLinkProps {
  btn?: boolean
  courtInfo?: {
    courtId: string
    courtName: string
  }
}

const ScheduleSessionLink: React.FC<ScheduleSessionLinkProps> = ({ btn }) => {
  const { navigate } = useNavigation()

  const {
    data: {
      auth: { token }
    }
  } = useQuery(Query.GetAuth)

  const onPress = () => {
    token ? navigate('CreateEditSession') : navigate('Authentication')
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
        No upcoming hoop sessions
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
