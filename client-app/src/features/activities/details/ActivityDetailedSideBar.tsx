import React, { Fragment } from 'react'
import { Segment, List, Item, Label, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { IAttendee } from '../../../app/models/activity'

interface IProps {
  attendees: IAttendee[]
}

const ActivityDetailedSideBar: React.FC<IProps>
  = ({ attendees }) => {
    const isHost = false;
    return (
      <Fragment>
        <Segment
          textAlign='center'
          style={{ border: 'none' }}
          attached='top'
          secondary
          inverted
          color='teal'
        >
          {attendees.length} {attendees.length === 1 ? 'Person' : 'People'} going
               </Segment>
        <Segment attached>
          <List relaxed divided>
            {attendees.map(attendee => (
              <Item style={{ position: 'relative' }} key={attendee.username}>
                {isHost && <Label
                  style={{ position: 'absolute' }}
                  color='orange'
                  ribbon='right'
                >
                  {attendee.username}
                </Label>}
                <Image size='tiny' src={attendee.image || '/assets/user.png'} />
                <Item.Content verticalAlign='middle'>
                  <Item.Header as='h3'>
                    <Link to={`/porfile/${attendee.username}`}>{attendee.displayName}</Link>
                  </Item.Header>
                  <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                </Item.Content>
              </Item>
            ))}

          </List>
        </Segment>
      </Fragment>
    )
  }

export default ActivityDetailedSideBar

