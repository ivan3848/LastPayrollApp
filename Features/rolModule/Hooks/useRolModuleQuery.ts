import { CACHE_KEY_ROL } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import rolModuleService from "../Services/rolModuleService";
import IRol from "@/Features/rol/Types/IRol";

const useRolModuleQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IRol>, Error>({
        queryKey: [CACHE_KEY_ROL, params, dependencies],
        queryFn: () => rolModuleService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useRolModuleQuery;
