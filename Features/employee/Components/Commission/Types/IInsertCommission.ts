import { ICommissionDetail } from "./ICommissionDetail";

export interface IInsertCommission {
    idEmployee: number;
    idCommissionDetail: number;
    idCommission: number;
    idConcept: number;
    amount: number;
    tax: number;
    chargeDate: Date;
    date: Date;
    payDate: Date;
    isFromFile: boolean;
    isPaid: boolean;
    isTaxes: boolean;
    idPayrollPay?: number;
    idCompany: number;
    isCommissionPayroll: boolean;
    isExcecuted: boolean;
    concept: number;
    commissionDetail: ICommissionDetail;
}
