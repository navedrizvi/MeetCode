import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { IMeeting } from '../../../app/models/meetings';
import MeetupStore from '../../../app/stores/meetupStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { categories } from '../../../app/common/options/categoryOptions';
import DateInput from '../../../app/common/form/DateInput';

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
    submitting,
    loadMeetup,
    clearMeeting
  } = meetingStore;

  const [meeting, setMeeting] = useState<IMeeting>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: null,
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

  // const handleSubmit = () => {
  //   if (meeting.id.length === 0) {
  //     //if a meeting exists in state
  //     let newMeeting = {
  //       ...meeting,
  //       id: uuid()
  //     };
  //     createMeeting(newMeeting).then(() =>
  //       history.push(`/meetups/${newMeeting.id}`)
  //     );
  //   } else {
  //     editMeeting(meeting).then(() => history.push(`/meetups/${meeting.id}`));
  //   }
  // };

  // const handleInputChange = (
  //   event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   //onchange event from handler
  //   const { name, value } = event.currentTarget;
  //   setMeeting({ ...meeting, [name]: value }); //spread properties of meeting
  // };

  const handleFinalFormSubmit = (value: any) => {
    //value contains the details filled in form when submitted
    console.log(value);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  component={TextInput}
                  placeholder='Title'
                  name='title'
                  value={meeting.title}
                />
                <Field
                  component={TextAreaInput}
                  placeholder='Description'
                  name='description'
                  rows={3}
                  value={meeting.description}
                />
                <Field
                  component={SelectInput}
                  name='category'
                  placeholder='Category'
                  value={meeting.category}
                  options={categories}
                />
                <Field
                  component={DateInput}
                  name='date'
                  placeholder='Date'
                  value={meeting.date!}
                />
                <Field
                  component={TextInput}
                  name='city'
                  placeholder='City'
                  value={meeting.city}
                />
                <Field
                  component={TextInput}
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
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(MeetingForm);
