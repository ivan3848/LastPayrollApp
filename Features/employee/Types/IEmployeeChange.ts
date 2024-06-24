export interface IEmployeeChange {
    idEmployee: number;
    idChange: number;
    idChangeManager?: number;
    idNewStatus?: number;
    salary?: number;
    dateChange: Date;
    changeName: string;
    idWorkScheduler?: number;
}
