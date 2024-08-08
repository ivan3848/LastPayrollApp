export interface IDeductionInsert {
    idEmployee: number;
    amount: number;
    start: Date;
    end: Date;
    idConcept: number;
    idDeduction?: number;
}
