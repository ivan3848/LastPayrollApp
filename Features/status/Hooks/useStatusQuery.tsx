import { CACHE_KEY_STATUS } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import statusService, {
    statusByTableNameService,
} from "../Services/statusService";
import { useQuery } from "@tanstack/react-query";
import { IStatus } from "../Types/IStatus";

const useStatusQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IStatus>, Error>({
        queryKey: [CACHE_KEY_STATUS, params, dependencies],
        queryFn: () => statusService.getForTable(params),
        initialData: { items: [] },
    });
};

const useStatusByTableNameQuery = (
    tableName: string,
    dependencies: boolean[]
) => {
    return useQuery<IStatus[], Error>({
        queryKey: [CACHE_KEY_STATUS, tableName, dependencies],
        queryFn: () => statusByTableNameService.get(tableName),
        initialData: [],
    });
};

export default useStatusQuery;
export { useStatusByTableNameQuery };
