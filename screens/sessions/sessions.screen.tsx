import React from 'react'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { FlatList } from 'react-native'
import { useQuery } from '@apollo/react-hooks'

import { Query } from '../../apollo'
import { Session } from '../../apollo/graphql/types.graphql'
import { keyExtractor } from '../../utils'
import SessionListItem from '../../components/session-list-item/session-list-item.component'
import ScheduleSessionLink from '../../components/schedule-session-link/schedule-session-link.component'

const SessionsScreen: NavigationStackScreenComponent = () => {
  const {
    data: { sessions }
  } = useQuery<{ sessions: Session[] }>(Query.GetSessions)

  const { data } = useQuery(Query.FetchSessions, { pollInterval: 3000 })

  return (
    <React.Fragment>
      {sessions.length > 0 ? (
        <FlatList
          keyExtractor={keyExtractor}
          data={sessions}
          renderItem={({ item }) => <SessionListItem session={item} />}
        />
      ) : (
        <ScheduleSessionLink />
      )}
    </React.Fragment>
  )
}

SessionsScreen.navigationOptions = {
  title: 'Hoop Sessions',
  headerRight: <ScheduleSessionLink btn />
}

export default SessionsScreen
