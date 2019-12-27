import React, { useState } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IMeeting } from '../../../app/models/meetings';

interface IProps {
  setEditMode: (editMode: boolean) => void;
  meeting: IMeeting;
}

export const MeetingForm: React.FC<IProps> = ({
  setEditMode,
  meeting: initialFormState
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
      };
    }
  };

  const [meeting, setMeeting] = useState<IMeeting>(initializeForm);

  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder='Title' value={meeting.title} />
        <Form.Input
          rows={2}
          placeholder='Description'
          value={meeting.description}
        />
        <Form.Input placeholder='Category' value={meeting.category} />
        <Form.Input type='date' placeholder='Date' value={meeting.date} />
        <Form.Input placeholder='City' value={meeting.city} />
        <Form.Input placeholder='Venue' value={meeting.venue} />
        <Button positive floated='right' type='submit' content='Submit' />
        <Button
          onClick={() => setEditMode(false)}
          floated='right'
          type='submit'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};
