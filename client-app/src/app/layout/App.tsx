import React, { useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import MeetingDashboard from '../../features/meetings/dashboard/MeetingDashboard';
import NavBar from '../../features/nav/NavBar';
import { LoadingComponent } from './LoadingComponent';
import MeetupStore from '../stores/meetupStore';
import { observer } from 'mobx-react-lite';

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
        <MeetingDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App); //higher order component to turn component to an observer

// Class component example-
// interface IState {
//   meetings: IMeeting[];
// }

// class App extends React.Component<{}, IState> {
//   //no properties being passed
//   state: IState = {
//     meetings: []
//   };

//   componentDidMount() {
//     axios
//       .get<IMeeting[]>('http://localhost:5000/api/meetings')
//       .then(response => {
//         this.setState({
//           meetings: response.data
//         });
//       });
//   }

//   render() {
//     return (
//       <div>
//         <Header as='h2'>
//           <Icon name='group' />
//           <Header.Content>Meet Code</Header.Content>
//         </Header>
//         <List>
//           {this.state.meetings.map(meeting => (
//             <List.Item key={meeting.id}>{meeting.venue}</List.Item>
//           ))}
//         </List>
//       </div>
//     );
//   }
// }
