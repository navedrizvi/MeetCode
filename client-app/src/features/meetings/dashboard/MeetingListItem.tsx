import React, { useContext } from 'react';
import { Item, Segment, Label, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MeetupStore from '../../../app/stores/meetupStore';
import { IMeeting } from '../../../app/models/meetings';

interface IProps {
  meeting: IMeeting;
}

const MeetingListItem: React.FC<IProps> = ({ meeting }) => {
  const meetingStore = useContext(MeetupStore);
  const { meetingsByDate, deleteMeeting, submitting, target } = meetingStore;
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' src='/assets/user.png' />
            <Item.Content>
              <Item.Header as='a'>{meeting.title}</Item.Header>
              <Item.Description>Hosted by Naved</Item.Description>
              {meeting.category ? ( //if category is provided, display it as extra
                <Item.Extra>
                  <Label basic content={meeting.category} />
                </Item.Extra>
              ) : (
                ''
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name='clock' /> {meeting.date}
        <Icon name='marker' /> {meeting.city},{meeting.venue}
      </Segment>
      <Segment secondary>Attendees list here</Segment>
      <Segment clearing>
        <span>{meeting.description}</span>
        <Button
          as={Link}
          to={`/meetups/${meeting.id}`}
          floated='right'
          content='View'
          color='blue'
        />
      </Segment>
    </Segment.Group>
  );
};

export default MeetingListItem;
