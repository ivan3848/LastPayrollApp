import { CACHE_KEY_REGION } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import { IRegion } from "../Types/IRegion";
import IResponse from "@/types/IResponse";
import regionService from "../Services/regionService";
import { useQuery } from "@tanstack/react-query";

const useRegionQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IRegion>, Error>({
        queryKey: [CACHE_KEY_REGION, params, dependencies],
        queryFn: () => regionService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useRegionQuery;
