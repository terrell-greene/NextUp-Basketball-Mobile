import React, { useState, useEffect } from 'react'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { View, FlatList } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import { useQuery } from '@apollo/react-hooks'

import { Query } from '../../apollo'
import { Session } from '../../apollo/graphql/types.graphql'
import { keyExtractor } from '../../utils'
import SessionListItem from '../../components/session-list-item/session-list-item.component'
import ScheduleSessionLink from '../../components/schedule-session-link/schedule-session-link.component'

export interface CourtSessionsRouteParams {
  courtId: string
  courtName: string
}

const CourtSessions: NavigationStackScreenComponent = () => {
  const [sessions, setSessions] = useState(null)
  const {
    state: { params }
  } = useNavigation()
  const { courtId, courtName } = params as CourtSessionsRouteParams

  const { data } = useQuery<{ sessions: Session[] }>(Query.GetSessions)

  useEffect(() => {
    if (data) {
      const sessionsByCourtId = data.sessions.filter(
        ({ court }) => court.id === courtId
      )
      setSessions(sessionsByCourtId)
    }
  }, [data])

  return (
    <View>
      {sessions && sessions.length > 0 ? (
        <FlatList
          keyExtractor={keyExtractor}
          data={sessions}
          renderItem={({ item }) => <SessionListItem session={item} />}
        />
      ) : (
        <ScheduleSessionLink courtInfo={{ courtId, courtName }} />
      )}
    </View>
  )
}

CourtSessions.navigationOptions = ({ navigation: { state } }) => {
  const {
    courtName,
    courtId
  } = (state.params as unknown) as CourtSessionsRouteParams

  return {
    title: courtName,
    headerRight: <ScheduleSessionLink btn courtInfo={{ courtId, courtName }} />
  }
}

export default CourtSessions
