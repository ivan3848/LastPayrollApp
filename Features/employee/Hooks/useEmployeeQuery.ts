import { CACHE_KEY_DEPARTMENT } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";

import { useQuery } from "@tanstack/react-query";
import IResponse from "@/types/IResponse";
import { IEmployee } from "../Types/IEmployee";
import employeeService from "../Services/employeeService";

const useEmployeeQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IEmployee>, Error>({
        queryKey: [CACHE_KEY_DEPARTMENT, params, dependencies],
        queryFn: () => employeeService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useEmployeeQuery;
