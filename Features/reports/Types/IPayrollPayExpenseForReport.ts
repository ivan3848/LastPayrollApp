export interface IPayrollPayExpenseForReport {
    identifier: string
    idPayrollPayDetailConcept: number
    idEmployee: number
    name: string
    idConcept: number
    concept: string
    conceptCode: string
    amount: number
    idAccountingAccount: number
    accountingAccount: string
    accountNumber: string
    idPayrollPay: number
    payrollName: string
    idCostCenter: number
    costCenter: string
    payrollPayDate: string
    idCompany: number
}