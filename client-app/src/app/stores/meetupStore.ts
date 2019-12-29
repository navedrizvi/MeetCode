import { createContext } from 'react';
import { observable, action } from 'mobx';
import { IMeeting } from '../models/meetings';
import agent from '../api/agent';

class MeetupStore {
  @observable meetings: IMeeting[] = [];
  @observable loadingInitial = false;
  @observable selectedMeetup: IMeeting | undefined;
  @observable editMode = false;
  @observable submitting = false;

  @action loadMeetups = async () => {
    this.loadingInitial = true;
    try {
      const meetings = await agent.Meetings.list();
      meetings.forEach(meeting => {
        meeting.date = meeting.date.split('.')[0]; //cleanup to remove date accuracy for inputs
        this.meetings.push(meeting);
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
      this.meetings.push(meeting);
      this.editMode = false;
      this.submitting = false;
    } catch (e) {
      console.log(e);
      this.submitting = false;
    }
  };

  @action selectMeeting = (id: string) => {
    this.selectedMeetup = this.meetings.find(m => m.id === id);
    this.editMode = false;
  };
}

export default createContext(new MeetupStore());
