export interface IRolModule {
    module: string;
    canWrite: boolean;
}

export default interface IAuth {
    userId: string;
    idCompany: string;
    rol: string;
    employeeName: string;
    rolModule: IRolModule[];
}