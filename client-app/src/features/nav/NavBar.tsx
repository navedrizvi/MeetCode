import React, { useContext } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import MeetupStore from '../../app/stores/meetupStore';
import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';

const NavBar: React.FC = () => {
  const meetingStore = useContext(MeetupStore);
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header exact as={NavLink} to='/'>
          <img
            src='/assets/logo.png'
            alt='logo.png'
            style={{ marginRight: 10 }}
          />
          MeetCode
        </Menu.Item>

        <Menu.Item name='Meetups' as={NavLink} to='/meetups' />
        <Menu.Item>
          <Button
            as={NavLink}
            to='/createMeetup'
            positive
            content='Create Meetup'
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
