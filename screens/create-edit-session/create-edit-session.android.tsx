import React, { useState } from 'react'
import { View, Picker, Dimensions, Text } from 'react-native'
import { Appearance } from 'react-native-appearance'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'

import { Court } from '../../apollo/graphql/types.graphql'

import {
  AndroidCourtPicker,
  AndroidPickerContainer,
  AndroidPickerLabel,
  AndroidPickerValue
} from './create-edit-session.styles'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import moment from 'moment'

interface CreateEditSessionAndroidProps {
  courts: Court[]
  selectedCourt: Court
  onCourtChange: (index: number) => void
  startTimeValue: Date
  minStartDate: Date
  maxStartDate: Date
  onStartTimeChange: (event: Event, newDate?: Date) => void
  minEndDate: Date
  endTimeValue: Date
  onEndTimeChange: (event: Event, newDate?: Date) => void
}

const colorScheme = Appearance.getColorScheme()

const CreateEditSessionAndroid: React.FC<CreateEditSessionAndroidProps> = ({
  courts,
  selectedCourt,
  onCourtChange,
  startTimeValue,
  minStartDate,
  maxStartDate,
  onStartTimeChange,
  minEndDate,
  endTimeValue,
  onEndTimeChange
}) => {
  const [dateVisible, setDateVisible] = useState(false)
  const [startTimeVisible, setStartTimeVisible] = useState(false)
  const [endTimeVisible, setEndTimeVisible] = useState(false)

  return (
    <React.Fragment>
      <AndroidPickerContainer>
        <AndroidPickerLabel>Court</AndroidPickerLabel>
        <AndroidCourtPicker
          selectedValue={selectedCourt.id}
          onValueChange={(value, index) => onCourtChange(index)}
        >
          {courts.map(court => (
            <Picker.Item
              key={court.id}
              label={court.name}
              value={court.id}
              color={colorScheme === 'light' ? 'black' : 'white'}
            />
          ))}
        </AndroidCourtPicker>
      </AndroidPickerContainer>

      <TouchableWithoutFeedback onPress={() => setDateVisible(true)}>
        <AndroidPickerContainer>
          <AndroidPickerLabel>Date</AndroidPickerLabel>
          <AndroidPickerValue>
            {moment(startTimeValue).format('ddd MMM Do')}
          </AndroidPickerValue>
        </AndroidPickerContainer>
        {dateVisible && (
          <DateTimePicker
            value={startTimeValue}
            mode="date"
            display="default"
            minimumDate={minStartDate}
            maximumDate={maxStartDate}
            onChange={(event, date) => {
              const { type } = event
              setDateVisible(false)

              if (type === 'set') {
                const newDate = new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate(),
                  startTimeValue.getHours(),
                  startTimeValue.getMinutes()
                )

                onStartTimeChange(event, newDate)
              }
            }}
          />
        )}
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => setStartTimeVisible(true)}>
        <AndroidPickerContainer>
          <AndroidPickerLabel>Start Time</AndroidPickerLabel>
          <AndroidPickerValue>
            {moment(startTimeValue).format('h:mma')}
          </AndroidPickerValue>
        </AndroidPickerContainer>
        {startTimeVisible && (
          <DateTimePicker
            value={startTimeValue}
            mode="time"
            display="default"
            minimumDate={minStartDate}
            maximumDate={maxStartDate}
            onChange={(event, date) => {
              const { type } = event
              setStartTimeVisible(false)

              if (type === 'set') {
                const newDate = new Date(
                  startTimeValue.getFullYear(),
                  startTimeValue.getMonth(),
                  startTimeValue.getDate(),
                  date.getHours(),
                  date.getMinutes()
                )
                onStartTimeChange(event, newDate)
              }
            }}
          />
        )}
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => setEndTimeVisible(true)}>
        <AndroidPickerContainer>
          <AndroidPickerLabel>End Time</AndroidPickerLabel>
          <AndroidPickerValue>
            {moment(endTimeValue).format('h:mma')}
          </AndroidPickerValue>
        </AndroidPickerContainer>
        {endTimeVisible && (
          <DateTimePicker
            value={endTimeValue}
            mode="time"
            display="default"
            minimumDate={minEndDate}
            onChange={(event, date) => {
              const { type } = event
              setEndTimeVisible(false)

              if (type === 'set') {
                const newDate = new Date(
                  startTimeValue.getFullYear(),
                  startTimeValue.getMonth(),
                  startTimeValue.getDate(),
                  date.getHours(),
                  date.getMinutes()
                )
                onEndTimeChange(event, newDate)
              }
            }}
          />
        )}
      </TouchableWithoutFeedback>
    </React.Fragment>
  )
}

export default CreateEditSessionAndroid
