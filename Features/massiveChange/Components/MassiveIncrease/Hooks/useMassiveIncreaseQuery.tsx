import IParamsApi from "@/types/IParamApi";
import { IMassiveIncrease } from "../Types/IMassiveIncrease";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_MASSIVE_INCREASE } from "@/constants/cacheKeys";
import massiveIncreaseService from "../Services/massiveIncreaseService";

const useMassiveIncreaseQuery = (
    params: IParamsApi,
    dependencies: boolean[]
) => {
    return useQuery<IResponse<IMassiveIncrease>, Error>({
        queryKey: [CACHE_KEY_MASSIVE_INCREASE, params, dependencies],
        queryFn: () => massiveIncreaseService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useMassiveIncreaseQuery;
