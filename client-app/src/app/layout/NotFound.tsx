import React from 'react';
import { Segment, Button, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name='search' />
        Oops - Page not found.
      </Header>
      <Segment.Inline>
        <Button as={Link} to='/meetups' primary>
          Return to Meetups page
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;
