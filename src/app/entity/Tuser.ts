import { Tperson } from "./Tperson";

export class Tuser {
    iduser: number;
    tperson: Tperson;
    loginuser: string;
    enableduser:number;
    accountNonExpired:boolean;
    accountNonLocked:boolean;
    credentialsNonExpired:boolean;

}
