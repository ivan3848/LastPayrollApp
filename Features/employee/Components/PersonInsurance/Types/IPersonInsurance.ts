interface IPersonInsurance {
    idPersonInsurance?: number;
    idEmployee?: number;
    idPerson: number;
    idConcept: number;
    concept: string;
    idEmployeeAuthorize?: number;
    percentDiscount: number;
    amount: number;
    startDate: Date;
    endDate: Date;
    person?: {
        firstName: string;
        firstLastName: string;
        secondLastName: string;
    };
}
interface IAddPersonInsurance { 
    idEmployee?: number;
    idPerson: number;
    idConcept: number;
    concept: string;
    idEmployeeAuthorize?: number;
    percentDiscount: number;
    amount: number;
    startDate: Date;
    endDate: Date;
    person?: {
        firstName: string;
        firstLastName: string;
        secondLastName: string;
    };
}
