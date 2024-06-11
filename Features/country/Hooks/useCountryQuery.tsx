import IParamsApi from "@/types/IParamApi";
import { ICountry } from "../Types/ICountry";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import countryService from "../Services/countryService";
import { CACHE_KEY_COUNTRY } from "@/constants/cacheKeys";


const useCountryQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<ICountry>, Error>({
        queryKey: [CACHE_KEY_COUNTRY, params, dependencies],
        queryFn: () => countryService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useCountryQuery;
