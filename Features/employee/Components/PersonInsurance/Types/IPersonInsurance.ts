interface IPersonInsurance {
    idPersonInsurance?: number;
    idEmployee: number;
    idPerson: number;
    concept: string;
    idConcept: number;
    idEmployeeAuthorize: number;
    percentDiscount: number;
    amount: number;
    startDate: Date;
    endDate: Date;
    person?: {
        firstName: string;
        firstLastName: string;
        secodLastName: string;
    };

}

