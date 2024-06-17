import ApiService from "@/services/ApiService";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";

function useEntityQuery<T>(
    params: IParamsApi,
    dependencies: boolean[],
    cacheKey: string,
    service: ApiService<T, T>
) {
    return useQuery<IResponse<T>, Error>({
        queryKey: [cacheKey, params, dependencies],
        queryFn: () => service.getForTable(params),
        initialData: { items: [] },
    });
}

export default useEntityQuery;
