import React, { useContext } from 'react';
import { Item, Segment, Label, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import MeetupStore from '../../../app/stores/meetupStore';
import { Link } from 'react-router-dom';

const MeetingList: React.FC = () => {
  const meetingStore = useContext(MeetupStore);
  const {
    meetingsByDate,
    selectMeeting,
    deleteMeeting,
    submitting,
    target
  } = meetingStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {meetingsByDate.map(meeting => (
          <Item key={meeting.id}>
            <Item.Content>
              <Item.Header as='a'>{meeting.title}</Item.Header>
              <Item.Meta>{meeting.date}</Item.Meta>
              <Item.Description>
                <div>{meeting.description}</div>
                <div>
                  {meeting.city}, {meeting.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  as={Link}
                  to={`/meetups/${meeting.id}`}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  name={meeting.id}
                  loading={target === meeting.id && submitting}
                  onClick={e => deleteMeeting(e, meeting.id)} //the mouse event
                  floated='right'
                  content='Delete'
                  color='red'
                />
                <Label basic content={meeting.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(MeetingList);
