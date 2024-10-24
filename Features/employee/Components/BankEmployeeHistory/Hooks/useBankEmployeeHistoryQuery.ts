import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_BANk_EMPLOYEE_HISTORY } from "@/constants/cacheKeys";
import { IBankEmployeeHistory } from "../types/IBankEmployeeHistory";
import IResponse from "@/types/IResponse";
import bankEmployeeHistory from "../Services/bankEmpleeHistoryService";

const useBankEmployeeHistoryQuery = (
    params: IParamsApi,
    dependencies: boolean[]
) => {
    return useQuery<IResponse<IBankEmployeeHistory>, Error>({
        queryKey: [CACHE_KEY_BANk_EMPLOYEE_HISTORY, params, dependencies],
        queryFn: () => bankEmployeeHistory.getForTable(params),
        initialData: { items: [] },
    });
};

export default useBankEmployeeHistoryQuery;
