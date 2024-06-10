import { CACHE_KEY_LOCATION } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import { ILocation } from "../Types/ILocation";
import IResponse from "@/types/IResponse";
import locationService from "../Services/locationService";
import { useQuery } from "@tanstack/react-query";

const useLocationQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<ILocation>, Error>({
        queryKey: [CACHE_KEY_LOCATION, params, dependencies],
        queryFn: () => locationService.get(params),
        initialData: { items: [] },
    });
};

export default useLocationQuery;
