import { atom } from "recoil";

export const User= atom({
    key: 'User',
    default: null, // 'voter' | 'president' | null
});