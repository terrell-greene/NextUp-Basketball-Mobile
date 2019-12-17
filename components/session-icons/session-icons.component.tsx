import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { Query } from '../../apollo'
import { User, Session } from '../../apollo/graphql/types.graphql'
import EditSessionBtn from '../edit-session-btn/edit-session-btn.component'
import UnjoinSessionBtn from '../unjoin-session-btn/unjoin-session-btn.component'
import JoinSessionBtn from '../join-session-btn/join-session-btn.component'

interface SessionIconsProps {
  sessionId: string
}

const SessionIcons: React.FC<SessionIconsProps> = ({ sessionId }) => {
  const {
    data: {
      auth: { user }
    }
  } = useQuery<{ auth: { user: User } }>(Query.GetAuth)

  const {
    data: { sessions }
  } = useQuery<{ sessions: Session[] }>(Query.GetSessions)

  const { createdBy, attending, court } = sessions.find(
    ({ id }) => id === sessionId
  )

  const isAttending = () => attending.find(u => u.id === user.id)

  if (user && createdBy.id === user.id) {
    return <EditSessionBtn sessionId={sessionId} courtId={court.id} />
  } else if (user && isAttending()) {
    return <UnjoinSessionBtn sessionId={sessionId} />
  } else {
    return <JoinSessionBtn sessionId={sessionId} />
  }
}

export default SessionIcons
