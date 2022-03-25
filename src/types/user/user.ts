export interface IUser {
  id?: string;
  userName?: string;
  email?: string;
  password?: {
    value: string;
    wrongTimes: number;
    timeExpired: string;
  };
  googleId?: string;
  facebookId?: string;
  appleId?: string;
  socialToken?: string;
  otp?: {
    value: string;
    wrongTimes: number;
    timeExpired: string;
  };
  profile?: {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    avatar?: string;
  };
  lastLogin?: string;
  country?: string;
  status?: string;
  statusSeller?: string;
  isSeller?: boolean;
  isDeleted?: boolean;
  deletedBy?: string;
  deletedAt?: string;
  dateUpdated?: string;
  dateCreated?: string;
  phone?: string;
  createDate?: string;
}

export interface IBuyer {
  number: string;
  username: string;
  email: string;
  phoneNumber: string;
  createDate: string;
  status: string;
}

export interface ISeller {
  number: string;
  username: string;
  email: string;
  phoneNumber: string;
  createDate: string;
  status: string;
}
