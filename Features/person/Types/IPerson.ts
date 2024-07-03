export interface IPerson {
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
    idPerson: number;
    idGender?: number;
    gender?: string;
}
