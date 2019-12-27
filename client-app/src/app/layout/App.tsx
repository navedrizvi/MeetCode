import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Header, Icon, List, Container } from 'semantic-ui-react';
import { IMeeting } from '../models/meetings';
import { MeetingDashboard } from '../../features/meetings/dashboard/MeetingDashboard';
import { NavBar } from '../../features/nav/NavBar';

const App = () => {
  const [meetings, setMeetings] = useState<IMeeting[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<IMeeting | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectedMeeting = (id: string) => {
    setSelectedMeeting(meetings.filter(m => m.id === id)[0]);
  };

  const handleOpenCreateForm = () => {
    setSelectedMeeting(null);
    setEditMode(true);
  };

  useEffect(() => {
    axios
      .get<IMeeting[]>('http://localhost:5000/api/meetings')
      .then(response => {
        setMeetings(response.data);
      });
  }, []); //empty array ensures useEffect runs only once, so no additional API calls are made

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <MeetingDashboard
          meetings={meetings}
          selectMeeting={handleSelectedMeeting}
          selectedMeeting={selectedMeeting!}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedMeeting={setSelectedMeeting}
        ></MeetingDashboard>
      </Container>
    </Fragment>
  );
};

export default App;

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
