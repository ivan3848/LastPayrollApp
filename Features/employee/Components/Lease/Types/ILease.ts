interface ILease {
    idLease: number;
    idEmployee: number;
    idConcept: number;
    idRecurrencyStatus: number;
    fees?: number;
    amountFee?: number;
    totalAmount: number;
    requestDate: Date;
    startDate: Date;
    endDate: Date;
    monthlyFee?: number;
    idBank?: number;
    leaseNumber?: string;
    description?: string;
    idPayrollPay?: number;
    paymentMethod?: boolean;
    idCompany?: number;
    idDepositConcept: number;
    idDiscountConcept: number;
    totalDebt?: number;
    recurrency?: string;
}