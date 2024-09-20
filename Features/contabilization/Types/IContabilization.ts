
interface IContabilization {
    Id: string;
    idCostCenter?: number; 
    costCenter: string; 
    accountNumber: string; 
    idEmployee: number; 
    firstName: string; 
    firstLastName: string; 
    idDepartment: number; 
    department: string;
    idPayrollPay: number;
    payrollName: string;
    idConcept: number; 
    concept: string; 
    conceptCode: string;
    isTax?: boolean; 
    amount: number; 
    isProfit?: boolean; 
    totalPay: number; 
    totalPayEmployee?: number;
    totalPayExpense?: number;
    totalTax?: number; 
    isMain: boolean; 
    name: string; 
    conceptAccountNumber: string; 
    isExpense?: boolean; 
    accountName: string; 
    idAccountingAccount?: number; 
    paymentMethod: string; 
    isCompany?: boolean; 
    isDebit?: boolean; 
    debit?: number; 
    credit?: number; 
}

interface ISecondContabilization { 
    groupBy: IContabilizationGroupBy;
    value: IContabilization[];
}

interface IContabilizationResponse {
    groupBy: IContabilizationGroupBy[];
    value: ISecondContabilization[];
}

interface IContabilizationGroupBy {
    Name: string;
    ConceptAccountNumber: string;
    AccountNumber: string;
    Debit?: number;
    Credit?: number;
}