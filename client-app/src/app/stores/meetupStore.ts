import { createContext } from 'react';
import { observable, action, computed } from 'mobx';
import { IMeeting } from '../models/meetings';
import agent from '../api/agent';

class MeetupStore {
  @observable meetingRegistry = new Map();
  @observable meetings: IMeeting[] = [];
  @observable loadingInitial = false;
  @observable selectedMeeting: IMeeting | undefined;
  @observable editMode = false;
  @observable submitting = false;

  @computed get meetingsByDate() {
    //in ascending dates order
    return Array.from(this.meetingRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadMeetups = async () => {
    this.loadingInitial = true;
    try {
      const meetings = await agent.Meetings.list();
      meetings.forEach(meeting => {
        meeting.date = meeting.date.split('.')[0]; //cleanup to remove date accuracy for inputs
        this.meetingRegistry.set(meeting.id, meeting);
      });
      this.loadingInitial = false;
    } catch (error) {
      console.log(error);
      this.loadingInitial = false;
    }
  };

  @action createMeeting = async (meeting: IMeeting) => {
    this.submitting = true;
    try {
      await agent.Meetings.create(meeting);
      this.meetingRegistry.set(meeting.id, meeting);
      this.editMode = false;
      this.submitting = false;
    } catch (e) {
      console.log(e);
      this.submitting = false;
    }
  };

  @action selectMeeting = (id: string) => {
    this.selectedMeeting = this.meetingRegistry.get(id);
    this.editMode = false;
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedMeeting = undefined;
  };
}

export default createContext(new MeetupStore());
