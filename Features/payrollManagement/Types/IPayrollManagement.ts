interface IPayrollManagement {
    idLicences: number;
    idEmployee: number;
    idConcept: number;
    idEmployeeRegister: number;
    doctorName: string;
    doctorexequatur: string;
    description: string;
    start: Date;
    end: Date;
    isToPay?: boolean;

}