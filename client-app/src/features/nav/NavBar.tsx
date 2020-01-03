import { observer } from 'mobx-react-lite';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

const NavBar: React.FC = () => {
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header exact as={NavLink} to='/'>
          <img
            src='/assets/logo.png'
            alt='logo.png'
            style={{ height: 50, width: 83 }}
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
