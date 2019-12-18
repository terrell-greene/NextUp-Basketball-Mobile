import React from 'react'
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
  const {
    state: { params }
  } = useNavigation()
  const { courtId, courtName } = params as CourtSessionsRouteParams

  const { data } = useQuery<{ sessionsByCourtId: Session[] }>(
    Query.SessionsByCourtId,
    { variables: { courtId } }
  )

  return (
    <View>
      {data && data.sessionsByCourtId.length > 0 ? (
        <FlatList
          keyExtractor={keyExtractor}
          data={data.sessionsByCourtId}
          renderItem={({ item }) => <SessionListItem session={item} />}
        />
      ) : (
        <ScheduleSessionLink courtInfo={{ courtId, courtName }} />
      )}
    </View>
  )
}

export default CourtSessions
