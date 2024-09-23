export interface IInsertUser {
    username?: string;
    password?: string;
    idRol?: number;
    idEmployee?: number;
    userId?: number;
}

export interface IUserReactivation extends IInsertUser {
    idEmployee: number;
    isActive: boolean;
}
