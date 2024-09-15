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
    
}
