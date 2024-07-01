import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import IResponse from "@/types/IResponse";
import { bankEmployeeHistory } from "../Services/employeeService";
import { IEmployeeHistory } from "../Types/IEmployeeHistory";
import { CACHE_KEY_BANk_EMPLOYEE_HISTORY } from "@/constants/cacheKeys";
import { IBankEmployeeHistory } from "../Types/IBankEmployeeHistory";

const useBankEmployeeHistory = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IBankEmployeeHistory>, Error>({
        queryKey: [CACHE_KEY_BANk_EMPLOYEE_HISTORY, params, dependencies],
        queryFn: () => bankEmployeeHistory.getForTable(params),
        initialData: { items: [] },
    });
};

export default useBankEmployeeHistory;
