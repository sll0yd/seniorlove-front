export interface IProfile {
  id: number;
  userName: string;
  gender: string;
  picture?: string;
  role: string;
  email: string;
  password: string;
  age: number;
  hometown: string;
  bio: string;
}

export interface ITag {
  id: number;
  name: string;
  color: string;
  created_at: Date;
  updated_at?: Date;
}

export interface IEvent {
  id: number;
  title: string;
  picture?: string;
  description: string;
  date: Date;
  location: string;
  created_at: Date;
  updated_at?: Date;
}

export interface IMessage {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  created_at: Date;
  updated_at?: Date;
}

export interface ITestimony {
  id: number;
  content: string;
  user_id: number;
  created_at: Date;
  updated_at?: Date;
}
