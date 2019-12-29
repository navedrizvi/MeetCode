import { createContext, SyntheticEvent } from 'react';
import { observable, action, computed, configure, runInAction } from 'mobx';
import { IMeeting } from '../models/meetings';
import agent from '../api/agent';

configure({ enforceActions: 'always' }); // makes sure that all functions that mutate state are wrapped with @action

class MeetupStore {
  //instead of useState() that returns stateful variable and a fn to update it, we use  observables <-- dont need the set functions returned from useState
  @observable meetingRegistry = new Map();
  @observable meetings: IMeeting[] = [];
  @observable loadingInitial = false; //for loader
  @observable selectedMeeting: IMeeting | undefined;
  @observable editMode = false;
  @observable submitting = false; //for loader
  @observable target = ''; //for loader to target  button. Isolate loading indicator for individual buttons

  @computed get meetingsByDate() {
    //in ascending dates order
    return Array.from(this.meetingRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadMeetups = async () => {
    this.loadingInitial = true; //this is fine since it comes before await call
    try {
      const meetings = await agent.Meetings.list();
      runInAction('loading meetings', () => {
        //name is optional, helps inside mobx dev tools
        meetings.forEach(meeting => {
          meeting.date = meeting.date.split('.')[0]; //cleanup to remove date accuracy for inputs
          this.meetingRegistry.set(meeting.id, meeting);
        });
        this.loadingInitial = false; // this is not fine, since it has its own scope
      });
    } catch (error) {
      runInAction('load meetings error', () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action createMeeting = async (meeting: IMeeting) => {
    this.submitting = true;
    try {
      await agent.Meetings.create(meeting);
      runInAction('creating new meeting', () => {
        this.meetingRegistry.set(meeting.id, meeting);
        this.editMode = false;
        this.submitting = false;
      });
    } catch (e) {
      runInAction('create meeting error', () => {
        this.submitting = false;
      });
      console.log(e);
    }
  };

  @action selectMeeting = (id: string) => {
    this.selectedMeeting = this.meetingRegistry.get(id);
    this.editMode = false;
  };

  @action editMeeting = async (meeting: IMeeting) => {
    this.submitting = true;
    try {
      await agent.Meetings.update(meeting);
      runInAction('editing meeting', () => {
        this.meetingRegistry.set(meeting.id, meeting);
        this.selectedMeeting = meeting;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (e) {
      runInAction('edit meeting error', () => {
        this.submitting = false;
      });
      console.log(e);
    }
  };

  @action deleteMeeting = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Meetings.delete(id);
      runInAction('deleting meeting', () => {
        this.meetingRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      });
    } catch (e) {
      runInAction('delete meeting error', () => {
        this.submitting = false;
        this.target = '';
      });
      console.log(e);
    }
  };

  @action openEditForm = (id: string) => {
    this.selectedMeeting = this.meetingRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedMeeting = () => {
    this.selectedMeeting = undefined;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedMeeting = undefined;
  };
}

export default createContext(new MeetupStore());
