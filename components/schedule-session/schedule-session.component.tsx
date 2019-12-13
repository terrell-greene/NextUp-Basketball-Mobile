import React from 'react'
import { Button } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import {
  ScheduleSessionView,
  ScheduleSessionText,
  ScheduleSessionBtnContainer
} from './schedule-session.styles'

const ScheduleSession: React.FC = () => {
  const { navigate } = useNavigation()

  return (
    <ScheduleSessionView>
      <ScheduleSessionText>No upcoming hoop sessions</ScheduleSessionText>
      <ScheduleSessionBtnContainer>
        <Button
          title="Schedule a Session"
          onPress={() => navigate('Authentication')}
          color="white"
        ></Button>
      </ScheduleSessionBtnContainer>
    </ScheduleSessionView>
  )
}

export default ScheduleSession
