import React from 'react'
import { useNavigation } from 'react-navigation-hooks'

import { Session } from '../../apollo/graphql/types.graphql'
import { ListItemContainer, ListItemText } from './session-list-item.styles'
import SessionIcons from '../session-icons/session-icons.component'
import { SessionDetailsRouteParams } from '../../screens/session-details/session-details.screen'

interface SessionListItemProps {
  session: Session
}

const SessionListItem: React.FC<SessionListItemProps> = ({ session }) => {
  const { navigate } = useNavigation()
  const { id, court, date, times, numberAttending } = session

  const routeParams: SessionDetailsRouteParams = {
    sessionId: id
  }

  return (
    <ListItemContainer
      title={court.name}
      onPress={() => navigate('SessionDetails', routeParams)}
      subtitle={
        <React.Fragment>
          <ListItemText>{`${date}: ${times}`}</ListItemText>
          <ListItemText>{`People going: ${numberAttending}`}</ListItemText>
        </React.Fragment>
      }
      rightIcon={<SessionIcons sessionId={id} />}
    />
  )
}

export default SessionListItem
