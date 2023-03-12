import { atom, selector } from "recoil";
import { Voters } from "./Voters";

export const OwnerAddress = atom({
    key : 'OwnerAddress',
    default : null,
 });

export const UserAddress= atom({
    key: 'UserAddress',
    default: null,
});

export const UserRule = selector({ 
    key : 'UserRule',
    get : ({get}) => {
        const addr = get(UserAddress);
        const contractOwner = get(OwnerAddress);
        const voters = get(Voters);
        if (addr === null || contractOwner === null) return null
        if (addr.toLowerCase() === contractOwner.toLowerCase()) return 'president'
        if (voters.includes(addr.toLowerCase())) return 'voter'
        return null
    }
})