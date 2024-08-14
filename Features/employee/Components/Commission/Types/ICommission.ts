import { ICommissionDetail } from "./ICommissionDetail";

export interface ICommission {
    idEmployee: number;
    idCommissionDetail: number;
    payDate: Date;
    idCommission: number;
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
    commissionDetail: ICommissionDetail;
}
