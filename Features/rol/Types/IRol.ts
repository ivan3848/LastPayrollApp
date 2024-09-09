export default interface IRol {
    description: string;
    active: boolean;
    isSuperUser: boolean;
    idRolModule: number;
    module: string;
    canWrite: boolean;
}
