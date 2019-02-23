import { Tproduct } from "./Tproduct";
import { Tproductversion } from "./Tproductversion";
import { Treporter } from "./Treporter";
import { Tvocabword } from "./Tvocabword";

export class Tticket {
    idticket: number;
    tproduct: Tproduct;
    tproductversion: Tproductversion;
    treporter: Treporter;
    tvocabword: Tvocabword;
    vocticketresol: Tvocabword;
    dateticket: Date;
    externalcodea: string;
    summary: string;
    vocticketstatus: Tvocabword;

}
