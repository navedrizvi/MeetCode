import React, { useContext, useEffect, Fragment } from 'react';
import { Card, Button, Image, Grid } from 'semantic-ui-react';
import MeetupStore from '../../../app/stores/meetupStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { Link } from 'react-router-dom';
import MeetingDetailedHeader from './MeetingDetailedHeader';
import MeetingDetailedInfo from './MeetingDetailedInfo';
import MeetingDetailedChat from './MeetingDetailedChat';
import MeetingDetailedSidebar from './MeetingDetailedSidebar';

interface DetailParams {
  id: string;
}

const MeetingDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const meetingStore = useContext(MeetupStore);
  const { meeting, loadMeetup, loadingInitial } = meetingStore;

  useEffect(() => {
    loadMeetup(match.params.id);
  }, [loadMeetup, match.params.id]); //runs once when component mounts

  if (loadingInitial || !meeting)
    return <LoadingComponent content='Loading meetup...' />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <MeetingDetailedHeader meeting={meeting} />
        <MeetingDetailedInfo meeting={meeting} />
        <MeetingDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <MeetingDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(MeetingDetails);
