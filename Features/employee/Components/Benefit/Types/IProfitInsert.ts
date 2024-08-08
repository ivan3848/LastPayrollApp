export interface IProfitInsert {
    idProfit?: number;
    amount: number;
    idConcept: number;
    idEmployee?: number;
    start: Date;
    end: Date;
}
