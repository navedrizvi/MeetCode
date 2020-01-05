export interface IMeeting {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date | null;
  city: string;
  venue: string;
}

export interface IMeetingFormValues extends Partial<IMeeting> {
  time?: Date;
}

export class MeetingFormValues implements IMeetingFormValues {
  id?: string = undefined;
  title: string = '';
  category: string = '';
  description: string = '';
  date?: Date = undefined;
  time?: Date = undefined;
  city: string = '';
  venue: string = '';

  constructor(init?: IMeetingFormValues) {
    // populates values by defualt in form
    if (init && init.date) {
      init.time = init.date;
    }
    Object.assign(this, init);
  }
}
