import { IPerson } from "@/Features/person/Types/IPerson";

export interface IDependant {
    idDependant?: number;
    identification: string;
    idEmployee?: number;
    idStatusRelationship?: number;
    relationship?: string;
    idPerson?: number;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    secondLastName?: string;
    fullName?: string;
    birthDate: Date;
    person?: IPerson;
}
