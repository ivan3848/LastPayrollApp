import IParamsApi from "@/types/IParamApi";
import { IGroupManager } from "../Types/IGroupManager";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import groupManagerService from "../Services/groupManagerService";
import { CACHE_KEY_COUNTRY, CACHE_KEY_GROUP_MANAGER } from "@/constants/cacheKeys";


const useGroupManagerQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IGroupManager>, Error>({
        queryKey: [CACHE_KEY_GROUP_MANAGER, params, dependencies],
        queryFn: () => groupManagerService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useGroupManagerQuery;
