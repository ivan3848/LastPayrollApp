interface IAllPayrollPay {
    idPayrollPay: number;
    payrollName: string;
    idPayrollArea: number;
    payrollPayDate: Date;
    payrollNumber: number;
    totalTax?: number;
    totalPay?: number;
    totalProfit?: number;
    totalDeduction?: number;
    payrollStartDate?: Date;
    startDate?: Date;
    endDate?: Date;
    isDifference?: boolean;
    payrollResume: IPayrollPayResume[];
    payrollPayDetailConcept: IPayrollPayDetailConcept[];
}

interface IPayrollPayDetailConcept {
    idPayrollPayDetailConcept: number;
    idPayrollPay?: number;
    idEmployee?: number;
    idConcept?: number;
    amount?: number;
    isProfit?: boolean;
    quantity?: number;
    conceptCode: string;
}