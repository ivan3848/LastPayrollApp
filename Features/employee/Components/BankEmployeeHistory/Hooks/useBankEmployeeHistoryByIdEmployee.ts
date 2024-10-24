import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { IBankEmployeeHistory } from "../types/IBankEmployeeHistory";
import { CACHE_KEY_BANk_EMPLOYEE_HISTORY } from "@/constants/cacheKeys";
import { bankEmployeeHistoryByIdEmployee } from "../Services/bankEmpleeHistoryService";

const useBankEmployeeHistoryByIdEmployee = (params: IParamsApi, dependencies: boolean[], idEmployee: number) => {
    return useQuery<IBankEmployeeHistory[], Error>({
        queryKey: [CACHE_KEY_BANk_EMPLOYEE_HISTORY, params, dependencies, idEmployee],
        queryFn: () => bankEmployeeHistoryByIdEmployee.getEntitiesById(idEmployee),
        initialData: []
    });
};

export default useBankEmployeeHistoryByIdEmployee;
