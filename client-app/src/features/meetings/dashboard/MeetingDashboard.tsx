import React, { SyntheticEvent, useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import { IMeeting } from '../../../app/models/meetings';
import MeetingList from './MeetingList';
import MeetingDetails from '../details/MeetingDetails';
import { MeetingForm } from '../form/MeetingForm';
import { observer } from 'mobx-react-lite';
import MeetupStore from '../../../app/stores/meetupStore';

interface IProps {
  setEditMode: (editMode: boolean) => void;
  setSelectedMeeting: (meeting: IMeeting | null) => void;
  editMeeting: (meeting: IMeeting) => void;
  deleteMeeting: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

const MeetingDashboard: React.FC<IProps> = ({
  setEditMode,
  setSelectedMeeting,
  editMeeting,
  deleteMeeting,
  submitting,
  target
}) => {
  const meetingStore = useContext(MeetupStore);
  const { selectedMeeting, editMode } = meetingStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <MeetingList
          deleteMeeting={deleteMeeting}
          submitting={submitting}
          target={target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedMeeting && !editMode && (
          <MeetingDetails
            setEditMode={setEditMode}
            setSelectedMeeting={setSelectedMeeting}
          />
        )}
        {editMode && (
          <MeetingForm
            key={(selectedMeeting && selectedMeeting.id) || 0}
            editMeeting={editMeeting}
            setEditMode={setEditMode}
            meeting={selectedMeeting!}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(MeetingDashboard);
