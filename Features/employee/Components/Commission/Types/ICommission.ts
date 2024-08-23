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
    idPayrollPay: number;
    idCompany: number;
    isCommissionPayroll: boolean;
    isExcecuted: boolean;
    concept: number;

    commissionDetail: ICommissionDetail[];
}

export const commissionArchiveSchema: Object = {
    idEmployee: 0,
    Amount: 0,
    IdPayrollPay: 0,
    Date: "",
    IdConcept: 0,
    ChargeDate: "",
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
    dateExcecuted: Date;
    description: string;
    concept: number;

    commissionDetail: ICommissionDetail[];
}
