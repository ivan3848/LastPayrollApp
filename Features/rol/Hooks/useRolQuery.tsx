import { CACHE_KEY_ROL } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import IRol from "../Types/IRol";
import rolService from "../Service/rolService";

const useRolQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IRol>, Error>({
        queryKey: [CACHE_KEY_ROL, params, dependencies],
        queryFn: () => rolService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useRolQuery;
