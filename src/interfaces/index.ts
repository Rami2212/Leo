/** @format */

export interface IUser {
  email: string;
  name: string;
  role: string;
  dob: string;
  password: string;
  lastName: string;
  studentId: string;
  faculty: string;
  department: string;
  avenue: string;
  mobileNumber: string;
}
export interface IEvent {
  id?: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  avenue: string;
  description: string;
  content: string;
  contact: string;
  featuredImage: string;
  images: string[];
}
export interface IAchivement {
  id?: string;
  name: string;
  description: string;
  content: string;
  featuredImage: string;
}

export interface IBooking {
  id?: string;
  userId: string;
  eventName: string;
  venue: string;
  date: string;
  time: string;
  avenue: string;
  status: string;
}
export interface IEvaluation {
  id?: string;
  name: string;
  description: string;
  content: string;
  featuredImage: string;
  month: string;
}
export interface INotification {
  id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  createdByUserId: string;
  vissibleToUserIds: object[];
  relatedEventId?: string;
}
