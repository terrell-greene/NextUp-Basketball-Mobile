import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { Event } from '@react-native-community/datetimepicker'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useNavigation } from 'react-navigation-hooks'
import moment from 'moment'
import momentTz from 'moment-timezone'

import { Query, Mutation } from '../../apollo'
import { ScrollContainer } from './create-edit-session.styles'
import { Court, Session } from '../../apollo/graphql/types.graphql'
import StyledSubmitBtn from '../../components/styled-submit-btn/styled-submit-btn.component'
import CreateEditSessionIOS from './create-edit-session.ios'
import CreateEditSessionAndroid from './create-edit-session.android'

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
      const newStartDateTime = moment(session.start).toDate()
      const newEndDateTime = moment(session.end).toDate()

      setStartDateTime(newStartDateTime)
      setEndDateTime(newEndDateTime)
    }
  }, [])

  const mutation = sessionId ? Mutation.UpdateSession : Mutation.CreateSession

  const availableCourts = courtId
    ? courts.filter(({ id }) => id === courtId)
    : courts

  const [createEditSession, { loading }] = useMutation(mutation, {
    onError: error => {
      console.error(JSON.stringify(error))
    },
    onCompleted: () => goBack()
  })

  const minStartDate = moment().toDate()

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
      variables.courtId = availableCourts[selectedCourtIndex].id
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
        {Platform.OS === 'ios' ? (
          <CreateEditSessionIOS
            courts={availableCourts}
            courtModalDisabled={courtId ? true : false}
            selectedCourt={availableCourts[selectedCourtIndex]}
            onCourtChange={setSelectedCourtIndex}
            formattedStartTimeValue={formattedStartDateTime(startDateTime)}
            minStartDate={minStartDate}
            maxStartDate={maxStartDate}
            startTimeValue={startDateTime}
            onStartTimeChange={onStartDateTimeChange}
            formattedEndTimeValue={formattedEndDateTime(endDateTime)}
            minEndDate={moment(startDateTime)
              .add(1, 'hour')
              .toDate()}
            endTimeValue={endDateTime}
            onEndTimeChange={onEndDateTimeChange}
          />
        ) : (
          <CreateEditSessionAndroid
            courts={availableCourts}
            selectedCourt={availableCourts[selectedCourtIndex]}
            onCourtChange={setSelectedCourtIndex}
            minStartDate={minStartDate}
            maxStartDate={maxStartDate}
            startTimeValue={startDateTime}
            onStartTimeChange={onStartDateTimeChange}
            minEndDate={moment(startDateTime)
              .add(1, 'hour')
              .toDate()}
            endTimeValue={endDateTime}
            onEndTimeChange={onEndDateTimeChange}
          />
        )}
        <StyledSubmitBtn
          title={sessionId ? 'Edit Session' : 'Schedule Session'}
          loading={loading}
          onPress={submitForm}
        />
      </ScrollContainer>
    </KeyboardAvoidingView>
  )
}

CreateEditSession.navigationOptions = ({
  navigation: {
    state: {
      params: { sessionId }
    }
  }
}) => ({
  title: sessionId ? 'Edit Session' : 'Schedule a Session'
})

export default CreateEditSession
