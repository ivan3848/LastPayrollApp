import IRolModuleModule from "@/Features/rolModule/Types/IRolModuleModule";

interface BaseModule {
    module: string;
    canWrite: boolean;
}

export default interface IRol extends BaseModule {
    description?: string;
    active?: boolean;
    isSuperUser?: boolean;
    rolModuleId?: number;
    idRolNumber?: number;
    idRol?: number;
    rolModule?: IRolModuleModule[];
}
