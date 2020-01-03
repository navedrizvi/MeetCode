import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { IMeeting } from '../../../app/models/meetings';
import { v4 as uuid } from 'uuid';
import MeetupStore from '../../../app/stores/meetupStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';

interface DetailParams {
  id: string;
}

const MeetingForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  //refer to meeting as initialFormState inside fn
  const meetingStore = useContext(MeetupStore);
  const {
    meeting: initialFormState,
    createMeeting,
    editMeeting,
    submitting,
    loadMeetup,
    clearMeeting
  } = meetingStore;

  const [meeting, setMeeting] = useState<IMeeting>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  });

  useEffect(() => {
    if (match.params.id && meeting.id.length === 0) {
      //second condition ensures there are no memory leaks
      loadMeetup(match.params.id).then(
        () => initialFormState && setMeeting(initialFormState)
      );
    }
    return () => {
      //clean up meeting from store when unmount
      clearMeeting();
    };
  }, [
    loadMeetup,
    clearMeeting,
    match.params.id,
    initialFormState,
    meeting.id.length
  ]); //added all dependencies

  const handleSubmit = () => {
    if (meeting.id.length === 0) {
      //if a meeting exists in state
      let newMeeting = {
        ...meeting,
        id: uuid()
      };
      createMeeting(newMeeting).then(() =>
        history.push(`/meetups/${newMeeting.id}`)
      );
    } else {
      editMeeting(meeting).then(() => history.push(`/meetups/${meeting.id}`));
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
    <Grid>
      <Grid.Column width={10}>
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
              onClick={() => history.push('/meetups')}
              floated='right'
              type='submit'
              content='Cancel'
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(MeetingForm);
