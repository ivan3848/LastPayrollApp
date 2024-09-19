import IRol from "@/Features/rol/Types/IRol";

export default interface IRolModuleModule extends IRol {
    module: string;
    canWrite: boolean;
    rolModuleId?: number;
    idRolNumber?: number;
}
