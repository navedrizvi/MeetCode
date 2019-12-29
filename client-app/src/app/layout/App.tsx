import React, { useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import MeetingDashboard from '../../features/meetings/dashboard/MeetingDashboard';
import NavBar from '../../features/nav/NavBar';
import { LoadingComponent } from './LoadingComponent';
import MeetupStore from '../stores/meetupStore';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import MeetingForm from '../../features/meetings/form/MeetingForm';
import MeetingDetails from '../../features/meetings/details/MeetingDetails';

const App = () => {
  const meetupStore = useContext(MeetupStore);

  useEffect(() => {
    meetupStore.loadMeetups();
  }, [meetupStore]); //empty array ensures useEffect runs only once, so no additional API calls are made. we specify the meetingstore as dependency

  if (meetupStore.loadingInitial)
    return <LoadingComponent content='Loading meetups...' />;

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/meetups' component={MeetingDashboard} />
        <Route path='/meetups/:id ' component={MeetingDetails} />
        <Route path='/createMeetup' component={MeetingForm} />
      </Container>
    </Fragment>
  );
};

export default observer(App); //higher order component that turns it to an observer
