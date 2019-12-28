import React from 'react';
import { Grid } from 'semantic-ui-react';
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
  createMeeting: (meeting: IMeeting) => void;
  editMeeting: (meeting: IMeeting) => void;
  deleteMeeting: (id: string) => void;
}
export const MeetingDashboard: React.FC<IProps> = ({
  meetings,
  selectMeeting,
  selectedMeeting,
  editMode,
  setEditMode,
  setSelectedMeeting,
  createMeeting,
  editMeeting,
  deleteMeeting
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <MeetingList
          meetings={meetings}
          selectMeeting={selectMeeting}
          deleteMeeting={deleteMeeting}
        />
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
          <MeetingForm
            key={(selectMeeting && selectedMeeting.id) || 0}
            createMeeting={createMeeting}
            editMeeting={editMeeting}
            setEditMode={setEditMode}
            meeting={selectedMeeting!}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
