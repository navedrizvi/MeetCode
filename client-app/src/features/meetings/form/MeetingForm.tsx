import React, { useState, FormEvent, useContext } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IMeeting } from '../../../app/models/meetings';
import { v4 as uuid } from 'uuid';
import MeetupStore from '../../../app/stores/meetupStore';

interface IProps {
  setEditMode: (editMode: boolean) => void;
  meeting: IMeeting;
  editMeeting: (meeting: IMeeting) => void;
  submitting: boolean;
}

export const MeetingForm: React.FC<IProps> = ({
  setEditMode,
  meeting: initialFormState,
  editMeeting,
  submitting
}) => {
  const meetingStore = useContext(MeetupStore);
  const { createMeeting } = meetingStore;
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

  const handleSubmit = () => {
    if (meeting.id.length === 0) {
      //if a meeting exists in state
      let newMeeting = {
        ...meeting,
        id: uuid()
      };
      createMeeting(newMeeting);
    } else {
      editMeeting(meeting);
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //onchange event from handler
    const { name, value } = event.currentTarget;
    setMeeting({ ...meeting, [name]: value }); //spread properties of meeting
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          placeholder='Title'
          name='title'
          value={meeting.title}
        />
        <Form.Input
          onChange={handleInputChange}
          rows={2}
          placeholder='Description'
          name='description'
          value={meeting.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name='category'
          placeholder='Category'
          value={meeting.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name='date'
          type='datetime-local'
          placeholder='Date'
          value={meeting.date}
        />
        <Form.Input
          onChange={handleInputChange}
          name='city'
          placeholder='City'
          value={meeting.city}
        />
        <Form.Input
          onChange={handleInputChange}
          name='venue'
          placeholder='Venue'
          value={meeting.venue}
        />
        <Button
          loading={submitting}
          positive
          floated='right'
          type='submit'
          content='Submit'
        />
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
