import React from 'react';
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image
            size='massive'
            src='/assets/logo.png'
            alt='logo'
            style={{ marginBottom: 12, height: 100, width: 166 }}
          />
          MeetCode
        </Header>
        <Header as='h2' inverted content='Welcome to MeetCode' />
        <Button as={Link} to='/meetups' size='huge' inverted>
          Take me to the meetups!
        </Button>
      </Container>
    </Segment>
  );
};

export default HomePage;
