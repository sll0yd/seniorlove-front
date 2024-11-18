export interface IUser {
  id: number;
  userName: string;
  gender: string;
  picture?: string;
  role: string;
  email: string;
  password: string;
  age: number;
  hometown: string;
  bio?: string;
  created_at: Date;
  updated_at?: Date;
  tags?: ITag[];
  events?: IEvent[];
  messagesSent?: IMessage[];
  messagesReceived?: IMessage[];
}

export interface ITag {
  id: number;
  name: string;
  color: string;
  created_at: Date;
  updated_at?: Date;
}

export interface IEvent {
  id?: number;
  title: string;
  picture?: string;
  description: string;
  date: string;
  location: string;
  attendees: IAttendee[];
  tags?: ITag[];
  created_at?: Date;
  updated_at?: Date;
  creator: ICreator;
}

export interface IMessage {
  id: number;
  content: string;
  sender_id: number;
  receiver_id: number;
  sender: IUser;
  receiver: IUser;
  created_at: string;
  updated_at: string;
}

export interface ITestimony {
  id: number;
  content: string;
  user_id: number;
  title: string;
  created_at: Date;
  updated_at?: Date;
  user: IUser;
}

export interface ICreator {
  id: number;
  userName: string;
  picture: string;
}

export interface ApiError {
  message: string;
  status: number;
  error: string;
}

export interface IAttendee {
  id: number;
  name: string;
}
