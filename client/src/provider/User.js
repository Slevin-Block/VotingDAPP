import { atom, selector } from "recoil";
import { Voters } from "./Voters";

export const OwnerAddress = atom({
    key : 'OwnerAddress',
    default : null,
 });

export const UserAddress= atom({
    key: 'UserAddress',
    default: null, // 'voter' | 'president' | null
});

export const UserRule = selector({ 
    key : 'UserRule',
    get : ({get}) => {
        const addr = get(UserAddress);
        const voters = get(Voters);
        const contractOwner = get(OwnerAddress);
        if (addr === null) return null
        if (addr === contractOwner) return 'president'
        if (voters.includes(addr.toLowerCase())) return 'voter'
        return null
    }
})