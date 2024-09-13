import { IInsertUser } from "./IInsertUser";

export interface IUser {
    idCompany: number;
    contactName: string;
    email: string;
    idDepartment: number;
    idEmployee: number;
    isActive: boolean;
    name: string;
    salary: number;
    sindicate: boolean;
    startDate: Date;
    employeeImage: string;
    idRol: number;
    users: IInsertUser[];
}
