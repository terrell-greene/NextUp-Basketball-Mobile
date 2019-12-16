import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, Picker } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useQuery } from '@apollo/react-hooks'
import { Appearance } from 'react-native-appearance'

import { Query } from '../../apollo'
import { ScrollContainer, CourtPicker } from './create-edit-session.styles'
import ModalInput from '../../components/modal-input/modal-input.component'
import { Court, Session } from '../../apollo/graphql/types.graphql'

const colorScheme = Appearance.getColorScheme()

const CreateEditSession: NavigationStackScreenComponent = () => {
  const [selectedCourtIndex, setSelectedCourtIndex] = useState(0)

  const {
    data: { courts, sessions }
  } = useQuery<{ courts: Court[]; sessions: Session[] }>(
    Query.GetCourtsAndSessions
  )

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
      </ScrollContainer>
    </KeyboardAvoidingView>
  )
}

CreateEditSession.navigationOptions = {
  title: 'Schedule a session'
}

export default CreateEditSession
