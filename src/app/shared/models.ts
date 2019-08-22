export interface UserModel {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  createdAt?: string;
}

export interface EmployeeModel {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  empId: number;
  createdAt: number;
}

export interface CurrentUserModel {
  _id: string;
  fullName: string;
  expirationTimer: number;
}

export interface LoginModel {
  email: string;
  password: string;
}
