export interface ICommissionDetail {
    idCommissionDetail: number;
    idCommission: number;
    idEmployee: number;
    idConcept: number;
    amount: number;
    tax: number;
    chargeDate: Date;
    date: Date;
    isFromFile: boolean;
    isPaid: boolean;
    isTaxes: boolean;
    idPayrollPay?: number;
    idCompany: number;
}
