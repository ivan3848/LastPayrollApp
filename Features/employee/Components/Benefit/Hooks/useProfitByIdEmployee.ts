import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_PROFIT } from "@/constants/cacheKeys";
import { IProfit } from "../Types/IProfit";
import { profitByIdEmployeeService } from "../Services/profitService";

const useProfitByIdEmployee = (
    params: IParamsApi,
    dependencies: boolean[],
    idEmployee: number
) => {
    return useQuery<IProfit[], Error>({
        queryKey: [CACHE_KEY_PROFIT, params, dependencies, idEmployee],
        queryFn: () => profitByIdEmployeeService.getEntitiesById(idEmployee),
        initialData: [],
    });
};

export default useProfitByIdEmployee;
