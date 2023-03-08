import { atom } from "recoil";

export const Proposals= atom({
    key: 'Proposals',
    default: [
        'Coucou les ptits loups',
        'Coucou les ptits chats',
        'Coucou les ptits lapins',
        'Coucou les ptits renards',
        'Coucou les ptits poussins',
    ]/* [] */,
});