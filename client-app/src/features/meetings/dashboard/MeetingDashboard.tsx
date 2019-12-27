import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { IMeeting } from '../../../app/models/meetings';
import { MeetingList } from './MeetingList';
import { MeetingDetails } from '../details/MeetingDetails';
import { MeetingForm } from '../form/MeetingForm';

interface IProps {
  meetings: IMeeting[];
  selectMeeting: (id: string) => void;
  selectedMeeting: IMeeting | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedMeeting: (meeting: IMeeting | null) => void;
}
export const MeetingDashboard: React.FC<IProps> = ({
  meetings,
  selectMeeting,
  selectedMeeting,
  editMode,
  setEditMode,
  setSelectedMeeting
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <MeetingList meetings={meetings} selectMeeting={selectMeeting} />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedMeeting && !editMode && (
          <MeetingDetails
            meeting={selectedMeeting}
            setEditMode={setEditMode}
            setSelectedMeeting={setSelectedMeeting}
          />
        )}
        {editMode && (
          <MeetingForm setEditMode={setEditMode} meeting={selectedMeeting!} />
        )}
      </Grid.Column>
    </Grid>
  );
};
