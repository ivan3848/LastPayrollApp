import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_MASSIVE_INCREASE } from "@/constants/cacheKeys";
import extraHourLatenessDataService from "../Services/extraHourLatenessService";

const useExtraHourLatenessDataQuery = (
    params: IParamsApi,
    dependencies: boolean[]
) => {
    return useQuery<IResponse<IExtraHourLatenessData>, Error>({
        queryKey: [CACHE_KEY_MASSIVE_INCREASE, params, dependencies],
        queryFn: () => extraHourLatenessDataService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useExtraHourLatenessDataQuery;