import { CACHE_KEY_ZONE } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import { IZone } from "../Types/IZone";
import IResponse from "@/types/IResponse";
import zoneService from "../Services/zoneService";
import { useQuery } from "@tanstack/react-query";

const useZoneQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IZone>, Error>({
        queryKey: [CACHE_KEY_ZONE, params, dependencies],
        queryFn: () => zoneService.get(params),
        initialData: { items: [] },
    });
};

export default useZoneQuery;
