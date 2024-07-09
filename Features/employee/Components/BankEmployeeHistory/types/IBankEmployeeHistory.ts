export interface IBankEmployeeHistory {
    idBankEmployeeHistory?: number;
    idEmployee?: number;
    idBank?: number;
    idEmployeeAuthorize?: number;
    accountNumber?: string;
    startDate?: string;
    endDate?: string;
    bankName?: string;
    idStatusAccountType?: number;
    isDeposit?: boolean;
}
