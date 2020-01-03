import React from 'react';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { IMeeting } from '../../../app/models/meetings';
import { observer } from 'mobx-react-lite';

const meetingImageStyle = {
  filter: 'brightness(30%)' //reduces brighteness to 30%
};

const meetingImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

const MeetingDetailedHeader: React.FC<{ meeting: IMeeting }> = ({
  meeting
}) => {
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={
            meeting.category
              ? `/assets/categoryImages/${meeting.category}.jpg`
              : '/assets/placeholder.png'
          }
          fluid
          style={meetingImageStyle}
        />
        <Segment basic style={meetingImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={meeting.title}
                  style={{ color: 'white' }}
                />
                <p>{meeting.date}</p>
                <p>
                  Hosted by <strong>Naved</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        <Button color='teal'>Join Activity</Button>
        <Button>Cancel attendance</Button>
        <Button color='orange' floated='right'>
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default observer(MeetingDetailedHeader); //since we're passing observible 'meeting' as props from details
