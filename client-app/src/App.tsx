import React from 'react';
import './App.css';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react';

class App extends React.Component {
  state = {
    values: []
    // value: Object
  };

  componentDidMount() {
    axios.get('http://localhost:5000/api/values').then(response => {
      this.setState({
        values: response.data
      });
    });
    // axios.get('http://localhost:5000/api/values/2').then(response => {
    //   this.setState({
    //     // value: Object.entries(response.data)
    //     value: response.data
    //   });
    // });
  }

  render() {
    return (
      <div>
        <Header as='h2'>
          <Icon name='group' />
          <Header.Content>Meet Code</Header.Content>
        </Header>
        <List>
          {this.state.values.map((v: any) => (
            <List.Item key={v.id}>{v.name}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
