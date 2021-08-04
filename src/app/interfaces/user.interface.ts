export interface User {
  uid?: string;
  active?: boolean;
  userUid?: string;
  email: string;
  password?: string;
  photo?: string;
  type: string;
}

export interface DeletedUser {
  uid?: string;
  deletedUser: User;
  deletedAt: string;
}
