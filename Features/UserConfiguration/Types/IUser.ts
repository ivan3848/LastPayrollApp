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
    isLog: boolean;
    startDate: Date;
    employeeImage: string;
    isBlock: boolean;
    idRol: number;
    users: IInsertUser[];
}
