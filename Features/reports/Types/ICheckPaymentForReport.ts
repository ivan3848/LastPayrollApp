export interface ICheckPaymentForReport {
    identifier: string;
    idPayrollPay: number;
    idEmployee: number;
    paymentMethod: string;
    amount: number;
    employeeName: string;
    payrollPayDate: string;
    idCompany: number;
}