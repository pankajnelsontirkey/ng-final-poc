export interface UserItem {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface UserModel {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  createdAt?: string;
}

export interface CurrentUserModel {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  expirationTimer: number;
}

export interface LocalUserModel {
  _id: string;
  fullName: string;
  expirationTimer: number;
}

export interface EmployeeModel {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  employeeCode: string;
  createdAt: number;
}

export interface LoginModel {
  email: string;
  password: string;
}

export interface AddUserModel {
  firstName: string;
  lastName: string;
  email: string;
}
