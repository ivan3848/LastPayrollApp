import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import IResponse from "@/types/IResponse";
import { CACHE_KEY_BANk_EMPLOYEE_HISTORY } from "@/constants/cacheKeys";
import { IBankEmployeeHistory } from "../Types/IBankEmployeeHistory";
import { bankEmployeeHistoryByIdEmployee } from "../Services/employeeService";

const useBankEmployeeHistory = (params: IParamsApi, dependencies: boolean[], idEmployee: number) => {
    return useQuery<IResponse<IBankEmployeeHistory>, Error>({
        queryKey: [CACHE_KEY_BANk_EMPLOYEE_HISTORY, params, dependencies, idEmployee],
        queryFn: () => bankEmployeeHistoryByIdEmployee.getForTable(params),
        initialData: { items: [] },
    });
};

export default useBankEmployeeHistory;
