export interface IDeduction {
    idEmployee: number;
    amount: number;
    start: Date;
    end: Date;
    idConcept: number;
    idDeduction?: number;
}
