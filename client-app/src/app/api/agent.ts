import axios, { AxiosResponse } from 'axios';
import { IMeeting } from '../models/meetings';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse) => response.data;

//function currying- will test UI interactions after calls
const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) =>
    axios
      .get(url)
      .then(sleep(1000))
      .then(responseBody), //fills responseBody after making request
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      .then(sleep(1000))
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios
      .put(url, body)
      .then(sleep(1000))
      .then(responseBody),
  del: (url: string) =>
    axios
      .delete(url)
      .then(sleep(1000))
      .then(responseBody)
};

const Meetings = {
  list: (): Promise<IMeeting[]> => requests.get('/meetups'),
  details: (id: string) => requests.get(`/meetups/${id}`),
  create: (meeting: IMeeting) => requests.post('/meetups', meeting),
  update: (meeting: IMeeting) =>
    requests.put(`/meetups/${meeting.id}`, meeting),
  delete: (id: string) => requests.del(`/meetups/${id}`)
};

export default { Meetings };
