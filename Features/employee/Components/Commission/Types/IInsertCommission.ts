import { ICommissionDetail } from "./ICommissionDetail";

export interface IInsertCommission {
    idCommission: number;
    idPayrollPay?: number;
    description: string;
    chargeDate: Date;
    payDate: Date;
    isExecuted: boolean;
    dateExecuted: Date;
    commissionDetail: ICommissionDetail;
}
