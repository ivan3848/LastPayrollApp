export interface IPermitForReport {
    identifier: string;
    idPermit: number;
    idEmployee: number;
    employeeName: string;
    startDate: string;
    endDate: string;
    conceptCode: string;
    conceptName: string;
    hourAmount: number;
    isPaid: string;
    isToPay: string;
    idPosition: number;
    position: string;
    idDepartment: number;
    department: string;
    idCompany: number;
}