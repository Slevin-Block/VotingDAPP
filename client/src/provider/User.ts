import { atom } from "recoil";

export type UserStatus = 'user' | 'admin' | 'invalid';

export const User= atom({
    key: 'User',
    default: 'invalid' as UserStatus,
});