import IParamsApi from "@/types/IParamApi";
import { IOccupation } from "../Types/IOccupation";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import occupationService from "../Services/occupationService";
import { CACHE_KEY_OCCUPATION } from "@/constants/cacheKeys";

const useOccupationQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IOccupation>, Error>({
        queryKey: [CACHE_KEY_OCCUPATION, params, dependencies],
        queryFn: () => occupationService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useOccupationQuery;
