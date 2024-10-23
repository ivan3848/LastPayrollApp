export interface IGetPayrollExecution {
    identifier?: string;
    idPayrollPay?: number;
    payrollPayDate?: string;
    departmentName?: string;
    position?: string;
    employeeName?: string;
    idEmployee?: number;
    startDate?: string;
    name?: string;
    conceptDefinition?: string;
    quantity?: number;
    totalAmount?: number;
    totalTax?: number;
    totalProfit?: number;
    totalDeduction?: number;
    totalPay?: number;
    idCostCenter?: number;
    payrollNumber?: number;
    payrollPeriodStart?: string;
    payrollPeriodEnd?: string;
    accrued?: number;
    averageCommission?: number;
    accountNumber?: string;
    creditIsrRemain?: number;
    creditIsrSustracted?: number;
    idCompany?: number;
    employeeC?: string;
}

export interface IGetPayrollExecutionTest {
    idPayrollTestCode?: number;
    payrollPayDate?: string;
    departmentName?: string;
    position?: string;
    employeeName?: string;
    idEmployee?: number;
    startDate?: string;
    name?: string;
    conceptDefinition?: string;
    quantity?: number;
    totalAmount?: number;
    totalTax?: number;
    totalProfit?: number;
    totalDeduction?: number;
    totalPay?: number;
    idCostCenter?: number;
    payrollTestNumber?: number;
    payrollPeriodStart?: string;
    payrollPeriodEnd?: string;
    accrued?: number;
    averageCommission?: number;
    idCompany?: number;
}