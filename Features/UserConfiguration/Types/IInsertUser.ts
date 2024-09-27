export interface IInsertUser {
    username?: string;
    password?: string;
    idRol?: number;
    idEmployee?: number;
    userId?: number;
    isBlock?: boolean;
}

export interface IUserReactivation extends IInsertUser {
    idEmployee: number;
    isActive: boolean;
}
