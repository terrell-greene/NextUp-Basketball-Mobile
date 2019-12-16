import React from 'react'

import { Session } from '../../apollo/graphql/types.graphql'
import { ListItemContainer, ListItemText } from './session-list-item.styles'

interface SessionListItemProps {
  session: Session
}

const SessionListItem: React.FC<SessionListItemProps> = ({ session }) => {
  const { court, date, times, numberAttending } = session
  return (
    <ListItemContainer
      title={court.name}
      onPress={() => console.log('go to details')}
      subtitle={
        <React.Fragment>
          <ListItemText>{`${date}: ${times}`}</ListItemText>
          <ListItemText>{`People going: ${numberAttending}`}</ListItemText>
        </React.Fragment>
      }
    />
  )
}

export default SessionListItem
