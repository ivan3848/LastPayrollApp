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
    isCommissionPayroll: boolean;
    isExcecuted: boolean;
    concept: number;

    commissionDetail: ICommissionDetail;
}

export const commissionArchiveSchema: Object = {
    idEmployee: 0,
    amount: 0,
    idPayrollPay: 0,
    date: "",
    concept: 0,
    chargeDate: "",
};

export interface ICommissionArchive {
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
    isCommissionPayroll: boolean;
    isExcecuted: boolean;
    concept: number;

    commissionDetail: ICommissionDetail[];
}
