export interface IBankEmployeeHistory {
    idBankEmployeeHistory?: number;
    idEmployee?: number;
    idBank?: number;
    idEmployeeAuthorize?: number;
    accountNumber?: string;
    startDate: Date;
    endDate: Date;
    bankName?: string;
    idStatusAccountType?: number;
    isDeposit?: boolean;
    isActive?: boolean;
}
