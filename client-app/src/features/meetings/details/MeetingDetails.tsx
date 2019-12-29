import React, { useContext } from 'react';
import { Card, Button, Image } from 'semantic-ui-react';
import { IMeeting } from '../../../app/models/meetings';
import MeetupStore from '../../../app/stores/meetupStore';
import { observer } from 'mobx-react-lite';

const MeetingDetails: React.FC = () => {
  const meetingStore = useContext(MeetupStore);
  const {
    selectedMeeting: meeting,
    openEditForm,
    cancelSelectedMeeting
  } = meetingStore; //call it meetup
  return (
    <Card>
      <Image
        src={`/assets/categoryImages/${meeting!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{meeting!.title}</Card.Header>
        <Card.Meta>
          <span className='date'>{meeting!.date}</span>
        </Card.Meta>
        <Card.Description>{meeting!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => openEditForm(meeting!.id)}
            basic
            color='blue'
            content='Edit'
          ></Button>
          <Button
            onClick={cancelSelectedMeeting}
            basic
            color='grey'
            content='Cancel'
          ></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(MeetingDetails);
