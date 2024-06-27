import { CACHE_KEY_EMPLOYEE} from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import employeeService from "../Services/employeeService";

const useEmployeeQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IEmployee>, Error>({
        queryKey: [CACHE_KEY_EMPLOYEE, params, dependencies],
        queryFn: () => employeeService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useEmployeeQuery;
