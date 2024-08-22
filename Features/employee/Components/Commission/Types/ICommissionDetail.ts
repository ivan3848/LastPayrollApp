export interface ICommissionDetail {
    amount: number;
    date: Date;
    concept: number;
    isPaid: boolean;
    idEmployee: number;
    idCommissionDetail?: number;
    idCommission: number;
    description?: string;
    idConcept: number;
    payDate: Date;
    isCommissionPayroll: boolean;
    idPayrollPay: number;
    chargeDate: Date;
}
