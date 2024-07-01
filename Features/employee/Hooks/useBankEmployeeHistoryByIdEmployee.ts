import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import IResponse from "@/types/IResponse";
import { bankEmployeeHistory } from "../Services/employeeService";
import { CACHE_KEY_BANk_EMPLOYEE_HISTORY } from "@/constants/cacheKeys";
import { IBankEmployeeHistory } from "../Types/IBankEmployeeHistory";

const useBankEmployeeHistoryByIdEmployee = (params: IParamsApi, dependencies: boolean[], idEmployee: number) => {
    return useQuery<IResponse<IBankEmployeeHistory>, Error>({
        queryKey: [CACHE_KEY_BANk_EMPLOYEE_HISTORY, params, dependencies],
        queryFn: () => bankEmployeeHistory.getForTable(params),
        initialData: { items: [] },
    });
};

export default useBankEmployeeHistoryByIdEmployee;
