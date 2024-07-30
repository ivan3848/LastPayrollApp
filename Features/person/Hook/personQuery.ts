import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import IResponse from "@/types/IResponse";
import { CACHE_KEY_PERSON } from "@/constants/cacheKeys";
import { IPerson } from "../Types/IPerson";
import personService from "../Services/personService";

const usePersonQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IPerson>, Error>({
        queryKey: [CACHE_KEY_PERSON, params, dependencies],
        queryFn: () => personService.getForTable(params),
        initialData: { items: [] },
    });
};

export default usePersonQuery;