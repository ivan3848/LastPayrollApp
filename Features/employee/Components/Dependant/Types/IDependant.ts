import { IPerson } from "@/Features/person/Types/IPerson";

export interface IDependant {
    idDependant?: number;
    idEmployee?: number;
    idStatusRelationship?: number;
    idPerson?: number;
    identification: string;
    idStatusMarital?: number;
    statusMarital: string;
    statusEducation: string;
    firstName: string;
    middleName?: string;
    firstLastName: string;
    secondLastName?: string;
    address?: string;
    email?: string;
    phoneNumber?: string;
    cellphoneNumber?: string;
    idNationality: number;
    identificationDisplay: string;
    birthDate: Date;
    idEducation: number;
    idGender?: number;
    gender?: string;
}
