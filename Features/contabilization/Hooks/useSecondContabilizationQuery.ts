import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_SECOND_CONTABILIZATION } from "@/constants/cacheKeys";
import { secondContabilizationService } from "@/Features/contabilization/Services/contabilizationServices";

const useSecondContabilizationQuery = (
    params: IParamsApi,
    dependencies: boolean[],
    id: number
) => {
    return useQuery<IContabilization[], Error>({
        queryKey: [CACHE_KEY_SECOND_CONTABILIZATION, params, dependencies, id],
        queryFn: async () => secondContabilizationService.getEntitiesById(id),
        initialData: [],
    });
};

export default useSecondContabilizationQuery;