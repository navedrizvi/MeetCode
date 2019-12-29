import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import MeetingList from './MeetingList';
import MeetingDetails from '../details/MeetingDetails';
import MeetingForm from '../form/MeetingForm';
import { observer } from 'mobx-react-lite';
import MeetupStore from '../../../app/stores/meetupStore';

const MeetingDashboard: React.FC = () => {
  const meetingStore = useContext(MeetupStore);
  const { meeting, editMode } = meetingStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <MeetingList />
      </Grid.Column>
      <Grid.Column width={6}>
        {meeting && !editMode && <MeetingDetails />}
        {editMode && (
          <MeetingForm key={(meeting && meeting.id) || 0} meeting={meeting!} />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(MeetingDashboard);
