import React, { useContext } from 'react';
import { Card, Button, Image } from 'semantic-ui-react';
import { IMeeting } from '../../../app/models/meetings';
import MeetupStore from '../../../app/stores/meetupStore';
import { observer } from 'mobx-react-lite';

interface IProps {
  setEditMode: (editMode: boolean) => void;
  setSelectedMeeting: (meeting: IMeeting | null) => void;
}

const MeetingDetails: React.FC<IProps> = ({
  setEditMode,
  setSelectedMeeting
}) => {
  const meetingStore = useContext(MeetupStore);
  const { selectedMeetup: meeting } = meetingStore; //call it meetup
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
          <span className='date'>{meeting.date}</span>
        </Card.Meta>
        <Card.Description>{meeting!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => setEditMode(true)}
            basic
            color='blue'
            content='Edit'
          ></Button>
          <Button
            onClick={() => setSelectedMeeting(null)}
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
