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

export interface IPaymentLoad {
    idPayrollPay: number;
    idEmployee: number;
    bankName: string;
    bankCode: string;
    paymentMethod: string;
    totalPay?: number; 
    accountNumber: string;
    identification: string;
    employeeName: string;
    countryName: string;
    sex?: string;
    email: string;
    description: string;
    transactionType: number;
    documentType: string;
    fileName: string;
}
