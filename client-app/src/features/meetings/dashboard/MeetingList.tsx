import React from 'react';
import { Image, Item, Segment, Label, Button } from 'semantic-ui-react';
import { IMeeting } from '../../../app/models/meetings';

interface IProps {
  meetings: IMeeting[];
  selectMeeting: (id: string) => void;
}

export const MeetingList: React.FC<IProps> = ({ meetings, selectMeeting }) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {meetings.map(meeting => (
          <Item>
            <Item.Content>
              <Item.Header as='a'>{meeting.title}</Item.Header>
              <Item.Meta>{meeting.date}</Item.Meta>
              <Item.Description>
                <div>{meeting.description}</div>
                <div>
                  {meeting.city}, {meeting.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectMeeting(meeting.id)}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Label basic content={meeting.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};
