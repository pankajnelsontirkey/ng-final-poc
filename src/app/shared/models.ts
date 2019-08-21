export interface LoginModel {
  email: string;
  password: string;
}

export interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  createdAt?: string;
}

export interface EmployeeModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  empId: number;
}

export interface CurrentUserModel {
  fullName: string;
  email: string;
  role: string;
  expirationTimer: number;
}
