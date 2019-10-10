import React from 'react';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react';
import { IMeeting } from '../models/meetings';

interface IState {
  meetings: IMeeting[];
}

class App extends React.Component<{}, IState> {
  //no properties being passed
  state: IState = {
    meetings: []
  };

  componentDidMount() {
    axios
      .get<IMeeting[]>('http://localhost:5000/api/meetings')
      .then(response => {
        this.setState({
          meetings: response.data
        });
      });
  }

  render() {
    return (
      <div>
        <Header as='h2'>
          <Icon name='group' />
          <Header.Content>Meet Code</Header.Content>
        </Header>
        <List>
          {this.state.meetings.map(meeting => (
            <List.Item key={meeting.id}>{meeting.venue}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
