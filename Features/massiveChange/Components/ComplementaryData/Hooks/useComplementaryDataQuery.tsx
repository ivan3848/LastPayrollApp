import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { IComplementaryData } from "../Types/IComplementaryData";
import { CACHE_KEY_COMPLEMENTARY_DATA } from "@/constants/cacheKeys";
import complementaryDataService from "../Services/complementaryDataService";

const useMassiveIncreaseQuery = (
    params: IParamsApi,
    dependencies: boolean[]
) => {
    return useQuery<IResponse<IComplementaryData>, Error>({
        queryKey: [CACHE_KEY_COMPLEMENTARY_DATA, params, dependencies],
        queryFn: () => complementaryDataService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useMassiveIncreaseQuery;
