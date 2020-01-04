import { action, computed, configure, observable, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import agent from '../api/agent';
import { IMeeting } from '../models/meetings';

configure({ enforceActions: 'always' }); // makes sure that all functions that mutate state are wrapped with @action

class MeetupStore {
  //instead of useState() that returns stateful variable and a fn to update it, we use  observables <-- dont need the set functions returned from useState
  @observable meetingRegistry = new Map();
  @observable loadingInitial = false; //for loader
  @observable meeting: IMeeting | null = null;
  @observable submitting = false; //for loader
  @observable target = ''; //for loader to target  button. Isolate loading indicator for individual buttons

  @computed get meetingsByDate() {
    //in ascending dates order
    return this.groupMeetingsByDate(Array.from(this.meetingRegistry.values()));
  }

  groupMeetingsByDate(meetings: IMeeting[]) {
    const sortedMeetings = meetings.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    // Grouping together by dates (so same date would have multiple meetings at one index) , each key is a meetings array
    return Object.entries(
      sortedMeetings.reduce((meetings, meeting) => {
        const date = meeting.date.toISOString().split('T')[0];
        meetings[date] = meetings[date]
          ? [...meetings[date], meeting]
          : [meeting]; //if key exists, then extend array, else just  add new entry
        return meetings;
      }, {} as { [key: string]: IMeeting[] })
    );
  }

  @action loadMeetups = async () => {
    this.loadingInitial = true; //this is fine since it comes before await call
    try {
      const meetings = await agent.Meetings.list();
      runInAction('loading meetings', () => {
        //name is optional, helps inside mobx dev tools
        meetings.forEach(meeting => {
          meeting.date = new Date(meeting.date); //cleanup to get date from inputs
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

  //will be used for loading single acitivty through router Link/url
  @action loadMeetup = async (id: string) => {
    let meeting = this.getMeeting(id);
    if (meeting) {
      this.meeting = meeting;
    } else {
      this.loadingInitial = true;
      try {
        meeting = await agent.Meetings.details(id);
        runInAction('getting meetup', () => {
          meeting.date = new Date(meeting.date);
          this.meeting = meeting;
          this.loadingInitial = false;
        });
      } catch (e) {
        runInAction('get meetup error', () => {
          this.loadingInitial = false;
        });
        console.log(e);
      }
    }
  };

  //helper
  getMeeting = (id: string) => {
    return this.meetingRegistry.get(id);
  };
  @action clearMeeting = () => {
    this.meeting = null;
  };

  @action createMeeting = async (meeting: IMeeting) => {
    this.submitting = true;
    try {
      await agent.Meetings.create(meeting);
      runInAction('creating new meeting', () => {
        this.meetingRegistry.set(meeting.id, meeting);
        this.submitting = false;
      });
    } catch (e) {
      runInAction('create meeting error', () => {
        this.submitting = false;
      });
      console.log(e);
    }
  };

  @action editMeeting = async (meeting: IMeeting) => {
    this.submitting = true;
    try {
      await agent.Meetings.update(meeting);
      runInAction('editing meeting', () => {
        this.meetingRegistry.set(meeting.id, meeting);
        this.meeting = meeting;
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
}

export default createContext(new MeetupStore());
