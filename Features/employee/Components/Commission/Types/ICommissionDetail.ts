export interface ICommissionDetail {
    amount: number;
    date: Date;
    concept?: string;
    conceptCode?: number;
    idEmployee: number;
    idCommissionDetail?: number;
    idCommission: number;
    description?: string;
    idConcept?: number;
    payDate: Date;
    isCommissionPayroll: boolean;
    idPayrollPay: number;
    chargeDate: Date;
}

export interface ICommissionDetailArchive {
    amount: number;
    date: Date;
    conceptcode?: string | number;
    idEmployee: number;
    idCommissionDetail?: number;
    idCommission: number;
    description?: string;
    idConcept?: number;
    payDate: Date;
    isCommissionPayroll: boolean;
    idpayrollpay: number;
    chargeDate: Date;
}
