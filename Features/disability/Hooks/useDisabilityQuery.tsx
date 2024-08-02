import IParamsApi from "@/types/IParamApi";
import { IDisability } from "../Types/IDisability";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import disabilityService from "../Services/disabilityService";
import { CACHE_KEY_DISABILITY } from "@/constants/cacheKeys";


const useDisabilityQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IDisability>, Error>({
        queryKey: [CACHE_KEY_DISABILITY, params, dependencies],
        queryFn: () => disabilityService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useDisabilityQuery;
