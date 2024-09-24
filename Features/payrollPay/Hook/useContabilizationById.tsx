import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_CONTABILIZATION } from "@/constants/cacheKeys";
import contabilizationService from "@/Features/contabilization/Services/contabilizationServices";

const useContabilizationById = (
    params: IParamsApi,
    dependencies: boolean[],
    id: number
) => {
    return useQuery<IContabilization[], Error>({
        queryKey: [CACHE_KEY_CONTABILIZATION, params, dependencies, id],
        queryFn: async () => contabilizationService.getEntitiesById(id),
        initialData: [],
    });
};

export default useContabilizationById;