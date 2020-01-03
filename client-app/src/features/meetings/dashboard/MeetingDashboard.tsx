import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import MeetingList from './MeetingList';
import { observer } from 'mobx-react-lite';
import MeetupStore from '../../../app/stores/meetupStore';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';

const MeetingDashboard: React.FC = () => {
  const meetupStore = useContext(MeetupStore);

  useEffect(() => {
    meetupStore.loadMeetups();
  }, [meetupStore]); //empty array ensures useEffect runs only once, so no additional API calls are made. we specify the meetingstore as dependency

  if (meetupStore.loadingInitial)
    return <LoadingComponent content='Loading meetups...' />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <MeetingList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Meetup filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(MeetingDashboard);
