export interface IprofitInsert {
    amount: number;
    idConcept: number;
    idEmployee?: number;
    start: Date;
    end: Date;
    isPaid: boolean;
}
