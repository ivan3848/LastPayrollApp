import {
    ICommissionDetail,
    ICommissionDetailArchive,
} from "./ICommissionDetail";

export interface ICommission {
    idEmployee: number;
    description: string;
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
    isCommissionPayroll: boolean;
    isExcecuted: boolean;
    payrollName: string;
    conceptCode: number;

    commissionDetail: ICommissionDetail[];
}

export const commissionArchiveSchema: Object = {
    idEmployee: 0,
    Amount: 0,
    IdPayrollPay: 0,
    Date: "",
    conceptCode: 0,
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
    idCompany: number;
    isCommissionPayroll: boolean;
    isExcecuted: boolean;
    dateExcecuted: Date;
    description: string;
    conceptcode: string | number;
    idpayrollpay: number;
    documentName: string;

    commissionDetail: ICommissionDetailArchive[];
}
