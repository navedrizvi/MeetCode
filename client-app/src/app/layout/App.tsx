import React, {
  useState,
  useEffect,
  Fragment,
  SyntheticEvent,
  useContext
} from 'react';
import { Container } from 'semantic-ui-react';
import { IMeeting } from '../models/meetings';
import MeetingDashboard from '../../features/meetings/dashboard/MeetingDashboard';
import { NavBar } from '../../features/nav/NavBar';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';
import MeetupStore from '../stores/meetupStore';
import { observer } from 'mobx-react-lite';

const App = () => {
  const meetupStore = useContext(MeetupStore);
  const [meetings, setMeetings] = useState<IMeeting[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<IMeeting | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true); //for loader
  const [submitting, setSummitting] = useState(false); //for loader
  const [target, setTarget] = useState(''); //for loader to target  button. Isolate loading indicator for individual buttons

  const handleSelectMeeting = (id: string) => {
    setSelectedMeeting(meetings.filter(m => m.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedMeeting(null);
    setEditMode(true);
  };

  const handleCreateMeeting = (meeting: IMeeting) => {
    setSummitting(true);
    agent.Meetings.create(meeting)
      .then(() => {
        setMeetings([...meetings, meeting]); //to combine the two
        setSelectedMeeting(meeting);
        setEditMode(false);
      })
      .then(() => setSummitting(false));
  };

  const handleEditMeeting = (meeting: IMeeting) => {
    setSummitting(true);
    agent.Meetings.update(meeting)
      .then(() => {
        setMeetings([...meetings.filter(m => m.id !== meeting.id), meeting]);
        setSelectedMeeting(meeting);
        setEditMode(false);
      })
      .then(() => setSummitting(false));
  };

  const handleDeleteMeeting = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    //add a warning
    setSummitting(true);
    setTarget(event.currentTarget.name);
    agent.Meetings.delete(id)
      .then(() => {
        setMeetings([...meetings.filter(m => m.id !== id)]);
      })
      .then(() => setSummitting(false));
  };

  useEffect(() => {
    meetupStore.loadMeetups();
  }, [meetupStore]); //empty array ensures useEffect runs only once, so no additional API calls are made. we specify the meetingstore as dependency

  if (meetupStore.loadingInitial)
    return <LoadingComponent content='Loading meetups...' />;

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <MeetingDashboard
          meetings={meetupStore.meetings}
          selectMeeting={handleSelectMeeting}
          setEditMode={setEditMode}
          setSelectedMeeting={setSelectedMeeting}
          createMeeting={handleCreateMeeting}
          editMeeting={handleEditMeeting}
          deleteMeeting={handleDeleteMeeting}
          submitting={submitting}
          target={target}
        ></MeetingDashboard>
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
