import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, Picker } from 'react-native'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Appearance } from 'react-native-appearance'
import { useNavigation } from 'react-navigation-hooks'
import moment from 'moment'

import { Query, Mutation } from '../../apollo'
import { ScrollContainer, CourtPicker } from './create-edit-session.styles'
import ModalInput from '../../components/modal-input/modal-input.component'
import { Court, Session } from '../../apollo/graphql/types.graphql'
import StyledSubmitBtn from '../../components/styled-submit-btn/styled-submit-btn.component'

const colorScheme = Appearance.getColorScheme()

export interface CreateEditSessionRouteParams {
  courtId?: string
  sessionId?: string
}

const CreateEditSession: NavigationStackScreenComponent = () => {
  const {
    data: { courts, sessions }
  } = useQuery<{ courts: Court[]; sessions: Session[] }>(
    Query.GetCourtsAndSessions
  )

  const {
    goBack,
    state: { params }
  } = useNavigation()

  const { courtId, sessionId } = params as CreateEditSessionRouteParams

  useEffect(() => {
    if (sessionId) {
      const session = sessions.find(({ id }) => id === sessionId)
      const newEndDateTime = moment(session.end).toDate()

      setEndDateTime(newEndDateTime)
    }
  }, [])

  const mutation = sessionId ? Mutation.UpdateSession : Mutation.CreateSession

  const [createEditSession, { loading }] = useMutation(mutation, {
    onError: error => {
      console.error(JSON.stringify(error))
    },
    onCompleted: () => goBack()
  })

  const minStartDate = sessionId
    ? moment(sessions.find(({ id }) => id === sessionId).start).toDate()
    : moment().toDate()

  const maxStartDate = moment()
    .add(7, 'd')
    .endOf('day')
    .toDate()

  const [selectedCourtIndex, setSelectedCourtIndex] = useState(0)
  const [startDateTime, setStartDateTime] = useState(minStartDate)
  const [endDateTime, setEndDateTime] = useState(
    moment(minStartDate)
      .add(1, 'hour')
      .toDate()
  )

  const formattedStartDateTime = (date: Date): string =>
    moment(date).format('ddd MMM Do h:mma')

  const formattedEndDateTime = (date: Date): string =>
    moment(date).format('h:mma')

  const onStartDateTimeChange = (event: Event, newDate?: Date) => {
    newDate = newDate ? newDate : startDateTime

    let newEndDateTime = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate(),
      endDateTime.getHours(),
      endDateTime.getMinutes()
    )

    const diffInMinutes = moment(newEndDateTime).diff(newDate, 'minutes')

    if (diffInMinutes < 59) {
      newEndDateTime = moment(newDate)
        .add(1, 'hour')
        .toDate()
    }

    newDate.setSeconds(0)

    setStartDateTime(newDate)
    setEndDateTime(newEndDateTime)
  }

  const onEndDateTimeChange = (event: Event, newDate?: Date) => {
    newDate = newDate ? newDate : endDateTime
    setEndDateTime(newDate)
  }

  const submitForm = async () => {
    let variables = {
      start: moment(startDateTime).toISOString(),
      end: moment(endDateTime).toISOString()
    } as any

    if (sessionId) {
      variables.sessionId = sessionId
    } else {
      variables.courtId = courts[selectedCourtIndex].id
    }

    createEditSession({ variables })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled
      keyboardVerticalOffset={100}
    >
      <ScrollContainer>
        <ModalInput label="Court" value={courts[selectedCourtIndex].name}>
          <CourtPicker
            selectedValue={courts[selectedCourtIndex].id}
            onValueChange={(value, index) => setSelectedCourtIndex(index)}
          >
            {courts.map(court => (
              <Picker.Item
                key={court.id}
                label={court.name}
                value={court.id}
                color={colorScheme === 'light' ? 'black' : 'white'}
              />
            ))}
          </CourtPicker>
        </ModalInput>
        <ModalInput
          label="Start Time"
          value={formattedStartDateTime(startDateTime)}
        >
          <DateTimePicker
            minimumDate={minStartDate}
            maximumDate={maxStartDate}
            mode="datetime"
            value={startDateTime}
            onChange={onStartDateTimeChange}
          />
        </ModalInput>
        <ModalInput label="End Time" value={formattedEndDateTime(endDateTime)}>
          <DateTimePicker
            minimumDate={moment(startDateTime)
              .add(1, 'hour')
              .toDate()}
            mode="time"
            value={endDateTime}
            onChange={onEndDateTimeChange}
          />
        </ModalInput>

        <StyledSubmitBtn
          title="Schedule Session"
          loading={loading}
          onPress={submitForm}
        />
      </ScrollContainer>
    </KeyboardAvoidingView>
  )
}

CreateEditSession.navigationOptions = {
  title: 'Schedule a session'
}

export default CreateEditSession
