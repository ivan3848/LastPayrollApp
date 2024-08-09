import { IISRInFavorDetail } from "../../ISRInFavorDetail/Types/IISRInFavorDetail";

export interface IISRInFavor {
    idIsrInFavor: number;
    idEmployee: number;
    date: Date;
    originalAmount?: number;
    missToPay?: number;
    idComplementaryData?: number;
    idConcept: number;
    isrInFavorDetail: IISRInFavorDetail[];
}
