import { atom, selector } from "recoil";
import { Voters } from "./Voters";

export const OwnerAddress = atom({
    key : 'OwnerAddress',
    default : null,
 });

export const UserAddress= atom({
    key: 'UserAddress',
    default: /* '0xf78dc6022fec2afb788d55eaf78c347ba2bf821a' */null, // 'voter' | 'president' | null
});

export const UserRule = selector({ 
    key : 'UserRule',
    get : ({get}) => {
        const addr = get(UserAddress);
        const voters = get(Voters);
        const contractOwner = get(OwnerAddress);
        if (addr === null) return null
        if (addr.toLowerCase() === contractOwner) return 'president'
        if (voters.includes(addr.toLowerCase())) return 'voter'
        return null
    }
})