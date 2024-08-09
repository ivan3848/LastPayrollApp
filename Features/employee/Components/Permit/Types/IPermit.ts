interface IPermit {
    idPermit?: number;
    idConcept: number;
    idEmployee: number;
    idEmployeeAuthorize?: number;
    idEmployeeRegister?: number;
    startDateTime: Date;
    endDateTime: Date;
    hourAmount?: number;
    amount?: number;
    isPaid?: boolean;
    isToPay?: boolean;
}

interface IPermitInsert {
    idConcept: number;
    idEmployee: number;
    idEmployeeAuthorize?: number;
    idEmployeeRegister?: number;
    startDateTime: Date;
    endDateTime: Date;
    hourAmount?: number;
    amount?: number;
    isPaid?: boolean;
    isToPay?: boolean;
}