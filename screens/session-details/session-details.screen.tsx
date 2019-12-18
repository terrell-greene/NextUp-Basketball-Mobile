import React, { useState, useEffect } from 'react'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useNavigation } from 'react-navigation-hooks'
import { useQuery } from '@apollo/react-hooks'

import { Session } from '../../apollo/graphql/types.graphql'
import { Query } from '../../apollo'
import SessionIcons from '../../components/session-icons/session-icons.component'
import {
  SessionDetailContainer,
  SectionContainer,
  HeaderText
} from './session-details.styles'
import CourtTile from '../../components/court-tile/court-tile.component'
import UserTile from '../../components/user-tile/user-tile.component'
import TextTile from '../../components/text-tile/text-tile.component'

export interface SessionDetailsRouteParams {
  sessionId: string
}

const SessionDetails: NavigationStackScreenComponent = () => {
  const [session, setSession] = useState<Session>(null)

  const {
    state: { params }
  } = useNavigation()

  const { sessionId } = params as SessionDetailsRouteParams

  const { data } = useQuery<{ sessionById: Session }>(Query.SessionById, {
    variables: { sessionId }
  })

  useEffect(() => {
    if (data) {
      setSession(data.sessionById)
    }
  }, [data])

  return (
    <React.Fragment>
      {session && (
        <SessionDetailContainer>
          <SectionContainer>
            <CourtTile court={session.court} />
          </SectionContainer>

          <SectionContainer>
            <HeaderText>Created By:</HeaderText>
            <UserTile user={session.createdBy} />
          </SectionContainer>

          <SectionContainer>
            <TextTile title="Date" value={session.date} />
            <TextTile title="Times" value={session.times} />
          </SectionContainer>

          <SectionContainer>
            <HeaderText>People Going:</HeaderText>
            {session.attending.map(user => (
              <UserTile key={user.id} user={user} />
            ))}
          </SectionContainer>
        </SessionDetailContainer>
      )}
    </React.Fragment>
  )
}

SessionDetails.navigationOptions = ({ navigation: { state } }) => {
  const { sessionId } = (state.params as unknown) as SessionDetailsRouteParams

  return {
    title: 'Session Details',
    headerRight: <SessionIcons sessionId={sessionId} />
  }
}

export default SessionDetails
