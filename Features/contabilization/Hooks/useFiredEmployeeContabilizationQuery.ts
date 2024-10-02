import ApiService from "@/services/ApiService";
import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";

function useFiredEmployeeEntityQuery<T>(
    params: IParamsApi,
    dependencies: boolean[],
    cacheKey: string,
    service: ApiService<T, T>
) {
    return useQuery<T, Error>({
        queryKey: [cacheKey, params, dependencies],
        queryFn: async () => {
            const response = await service.getForTable(params);
            return response.items as T;
        },
    });
}

export default useFiredEmployeeEntityQuery;
