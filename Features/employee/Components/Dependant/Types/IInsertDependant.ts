export interface IInsertDependant {
    idDependant?: number;
    idEmployee?: number;
    idStatusRelationship?: number;
    idPerson?: number;
    identification: string;
    firstName: string;
    middleName?: string;
    firstLastName: string;
    secondLastName?: string;
    birthDate: Date;
}
