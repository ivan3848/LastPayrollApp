import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import IResponse from "@/types/IResponse";
import { CACHE_KEY_EMPLOYEE_HISTORY } from "@/constants/cacheKeys";
import { employeeHistory } from "../Services/employeeService";
import { IEmployeeHistory } from "../Types/IEmployeeHistory";

const useEmployeeHistory = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IEmployeeHistory>, Error>({
        queryKey: [CACHE_KEY_EMPLOYEE_HISTORY, params, dependencies],
        queryFn: () => employeeHistory.getForTable(params),
        initialData: { items: [] },
    });
};

export default useEmployeeHistory;
