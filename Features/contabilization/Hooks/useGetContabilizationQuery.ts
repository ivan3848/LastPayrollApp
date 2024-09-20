import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_CONTABILIZATION } from "@/constants/cacheKeys";
import contabilizationService from "../Services/contabilizationServices";

const useGetContabilizationQuery = (
    params: IParamsApi,
    dependencies: boolean[],
    id: number
) => {
    return useQuery<IContabilization[], Error>({
        queryKey: [CACHE_KEY_CONTABILIZATION, params, dependencies, id],
        queryFn: async () => {
            const result = await contabilizationService.getEntitiesById(id);
            return result.flat(); // Flatten the array if it's nested
        },
        initialData: [],
    });
};

export default useGetContabilizationQuery;