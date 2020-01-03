import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import MeetingDashboard from '../../features/meetings/dashboard/MeetingDashboard';
import NavBar from '../../features/nav/NavBar';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import MeetingForm from '../../features/meetings/form/MeetingForm';
import MeetingDetails from '../../features/meetings/details/MeetingDetails';

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/meetups' component={MeetingDashboard} />
              <Route path='/meetups/:id' component={MeetingDetails} />
              <Route
                key={location.key}
                path={['/createMeetup', '/manage/:id']}
                component={MeetingForm}
              />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};
// Note: Added key to route, so when prop change inside route, it creates new instance of MeetingForm

export default withRouter(observer(App)); //higher order components
