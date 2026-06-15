/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';
export type TUser = {
  name: string;
  email: string;
  phone?: number;
  address?: string;
  image?: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
};

export type TLoginUser = {
  email: string;
  password: string;
};

export type TUserRole = keyof typeof USER_ROLE;

export interface UserModel extends Model<TUser> {
  isPasswordMatched(password: string, hashedPassword: string): Promise<boolean>;
}
