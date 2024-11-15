export interface SubscriberType {
  id: number;
  user_id: string;
  package: string;
  expires_on: string;
}

export interface UserType {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  active: string;
  address: string;
  country: string;
  join_date: string;
}
