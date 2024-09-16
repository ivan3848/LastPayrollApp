import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_ROL_MODULE } from "@/constants/cacheKeys";
import IRolModule from "../Types/IRolModule";
import { rolModuleByIdRolService } from "../Services/rolModuleService";

const useRolModuleByIdRol = (
    params: IParamsApi,
    dependencies: boolean[],
    idRol: number
) => {
    return useQuery<IRolModule[], Error>({
        queryKey: [CACHE_KEY_ROL_MODULE, params, dependencies, idRol],
        queryFn: () => rolModuleByIdRolService.getEntitiesById(idRol),
        initialData: [],
    });
};

export default useRolModuleByIdRol;
