import { atom } from "recoil";

export const User= atom({
    key: 'User',
    default: {address : null, rule : null}, // 'voter' | 'president' | null
});