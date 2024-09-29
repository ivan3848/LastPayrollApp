
interface IContabilization {
    costCenter: string; 
    accountNumber: string;
    accountName: string; 
    idEmployee: number;
    firstName: string; 
    firstLastName: string; 
    secondLastName: string; 
    department: string;
    payrollName: string;
    concept: string; 
    conceptCode: string;
    amount: number; 
    totalPay: number; 
    totalPayEmployee?: number;
    totalPayExpense?: number;
    totalTax?: number; 
    name: string; 
    paymentMethod: string; 
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

interface IContabilizationDifference {
    identifier?: string;
    idEmployee?: number;
    idPayrollPay?: number;
    debit?: number;
    credit?: number;
    difference?: number;
}