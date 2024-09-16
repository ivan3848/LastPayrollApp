export interface IPayrollPay {
    idPayrollPay: number;
    payrollName: string;
    idPayrollArea: number;
    payrollPayDate: Date;
    payrollNumber: number;
    totalTax?: number;
    totalPay?: number;
    payrollStartDate?: Date;
    startDate?: Date;
    endDate?: Date;
    employees?: number[];
    toExclude?: boolean;
    isTest?: boolean;
}
