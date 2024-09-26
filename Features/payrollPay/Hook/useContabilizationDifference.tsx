import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_CONTABILIZATION } from "@/constants/cacheKeys";
import { contabilizationDifferenceService } from "@/Features/contabilization/Services/contabilizationServices";

const useContabilizationDifference = (
    params: IParamsApi,
    dependencies: boolean[],
    id: number
) => {
    return useQuery<IContabilizationDifference, Error>({
        queryKey: [CACHE_KEY_CONTABILIZATION, params, dependencies, id],
        queryFn: () => contabilizationDifferenceService.getById(id),
        initialData: {} as IContabilizationDifference,
    });
};

export default useContabilizationDifference;