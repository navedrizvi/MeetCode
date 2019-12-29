import React, { useContext } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import MeetupStore from '../../app/stores/meetupStore';
import { observer } from 'mobx-react-lite';

const NavBar: React.FC = () => {
  const meetingStore = useContext(MeetupStore);
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header>
          <img
            src='/assets/logo.png'
            alt='logo.png'
            style={{ marginRight: 10 }}
          />
          MeetCode
        </Menu.Item>

        <Menu.Item name='Meetups' />
        <Menu.Item>
          <Button
            onClick={meetingStore.openCreateForm}
            positive
            content='Create Meetup'
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
