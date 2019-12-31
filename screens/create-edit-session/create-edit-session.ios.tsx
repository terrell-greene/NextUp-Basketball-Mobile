import React from 'react'
import { Picker } from 'react-native'
import { Appearance } from 'react-native-appearance'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'

import ModalInput from '../../components/modal-input/modal-input.component'
import { CourtPicker } from './create-edit-session.styles'
import { Court } from '../../apollo/graphql/types.graphql'

const colorScheme = Appearance.getColorScheme()

interface CreateEditSessionIOSProps {
  courts: Court[]
  selectedCourt: Court
  courtModalDisabled: boolean
  onCourtChange: (index: number) => void
  formattedStartTimeValue: string
  startTimeValue: Date
  minStartDate: Date
  maxStartDate: Date
  onStartTimeChange: (event: Event, newDate?: Date) => void
  formattedEndTimeValue: string
  minEndDate: Date
  endTimeValue: Date
  onEndTimeChange: (event: Event, newDate?: Date) => void
}

const CreateEditSessionIOS: React.FC<CreateEditSessionIOSProps> = ({
  courts,
  courtModalDisabled,
  selectedCourt,
  onCourtChange,
  startTimeValue,
  formattedStartTimeValue,
  minStartDate,
  maxStartDate,
  onStartTimeChange,
  formattedEndTimeValue,
  minEndDate,
  endTimeValue,
  onEndTimeChange
}) => {
  return (
    <React.Fragment>
      <ModalInput
        label="Court"
        value={selectedCourt.name}
        disabled={courtModalDisabled}
      >
        <CourtPicker
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
        </CourtPicker>
      </ModalInput>
      <ModalInput label="Start Time" value={formattedStartTimeValue}>
        <DateTimePicker
          minimumDate={minStartDate}
          maximumDate={maxStartDate}
          mode="datetime"
          value={startTimeValue}
          onChange={onStartTimeChange}
        />
      </ModalInput>
      <ModalInput label="End Time" value={formattedEndTimeValue}>
        <DateTimePicker
          minimumDate={minEndDate}
          mode="time"
          value={endTimeValue}
          onChange={onEndTimeChange}
        />
      </ModalInput>
    </React.Fragment>
  )
}

export default CreateEditSessionIOS
