export interface UserItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface UserModel {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  createdAt?: string;
}

export interface CurrentUserModel {
  id: string;
  fullName: string;
  email: string;
  role: string;
  expirationTimer: number;
}

export interface LocalUserModel {
  id: string;
  fullName: string;
  expirationTimer: number;
}

export interface EmployeeForm {
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface EmployeeModel {
  _id?: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
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
