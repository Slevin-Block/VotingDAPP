import { atom, selector } from "recoil";
import { Voters } from "./Voters";

const contractOwner = '0xf78dC6022fec2AFb788D55eaF78c347BA2bf821e'

export const UserAddress= atom({
    key: 'UserAddress',
    default: null, // 'voter' | 'president' | null
});

export const UserRule = selector({
    key : 'UserRule',
    get : ({get}) => {
        const addr = get(UserAddress);
        const voters = get(Voters)
        console.log(voters)
        if (addr === null) return null
        if (addr === contractOwner) return 'president'
        if (voters.includes(addr.toLowerCase())) return 'voter'
        return null
    }
})