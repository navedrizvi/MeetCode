import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { MeetingFormValues } from '../../../app/models/meetings';
import MeetupStore from '../../../app/stores/meetupStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { categories } from '../../../app/common/options/categoryOptions';
import DateInput from '../../../app/common/form/DateInput';
import { combineDateAndTime } from '../../../app/common/util/util';
import { v4 as uuid } from 'uuid';
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan
} from 'revalidate';

interface DetailParams {
  id: string;
}

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired('Category'),
  description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters'
    })
  )(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date'),
  time: isRequired('Time')
});

const MeetingForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  //refer to meeting as initialFormState inside fn
  const meetingStore = useContext(MeetupStore);
  const { createMeeting, editMeeting, submitting, loadMeetup } = meetingStore;

  const [meeting, setMeeting] = useState(new MeetingFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id && !meeting.id) {
      loadMeetup(match.params.id).then(meetup => setMeeting(meetup));
    } // cleans meeting from store when unmount
  }, [loadMeetup, match.params.id]); //added all dependencies

  const handleFinalFormSubmit = (values: any) => {
    //value contains the details filled in form when submitted
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...meeting } = values; // meeting contains everything in values except date and time
    meeting.date = dateAndTime;
    if (!meeting.id) {
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
  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
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
                <Form.Group widths='equal'>
                  <Field
                    component={DateInput}
                    name='date'
                    placeholder='Date'
                    date={true}
                    value={meeting.date}
                  />
                  <Field
                    component={DateInput}
                    name='time'
                    placeholder='Time'
                    time={true}
                    value={meeting.time}
                  />
                </Form.Group>
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
                  disabled={loading}
                  positive
                  floated='right'
                  type='submit'
                  content='Submit'
                />
                <Button
                  onClick={
                    meeting.id
                      ? () => history.push(`/meetups/${meeting.id}`)
                      : () => history.push('/meetups')
                  }
                  disabled={loading || invalid || pristine}
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
