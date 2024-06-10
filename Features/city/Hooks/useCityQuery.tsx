import { CACHE_KEY_CITIES } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import cityService from "../Services/cityService";
import { useQuery } from "@tanstack/react-query";
import { ICity } from "../Types/ICity";

const useCityQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<ICity>, Error>({
        queryKey: [CACHE_KEY_CITIES, params, dependencies],
        queryFn: () => cityService.get(params),
        initialData: { items: [] },
    });
};

export default useCityQuery;
