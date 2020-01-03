import React, { useContext, Fragment } from 'react';
import { Item, Segment, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import MeetupStore from '../../../app/stores/meetupStore';
import MeetingListItem from './MeetingListItem';

const MeetingList: React.FC = () => {
  const meetingStore = useContext(MeetupStore);
  const { meetingsByDate } = meetingStore;
  return (
    <Fragment>
      {meetingsByDate.map(([group, meetings]) => (
        <Fragment key={group}>
          <Label size='large' color='blue'>
            {group}
          </Label>
          <Item.Group divided>
            {meetings.map(meeting => (
              <MeetingListItem meeting={meeting} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(MeetingList);
