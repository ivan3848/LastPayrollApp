export interface IProfit {
    idProfit?: number;
    amount: number;
    idConcept: number;
    idEmployee?: number;
    start: Date;
    end: Date;
    conceptName?: string;
    temporaryDays?: number;
}
