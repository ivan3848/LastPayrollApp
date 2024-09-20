export interface IBankPaymentForReport {
    identifier: string;
    idEmployee: number;
    employeeName: string;
    amount: number;
    idPayrollPay: number;
    paymentMethod: string;
    bankName: string;
    idCompany: number;
}