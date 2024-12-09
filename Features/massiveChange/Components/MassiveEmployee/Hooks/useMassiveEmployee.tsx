import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_MASSIVE_EMPLOYEE } from "@/constants/cacheKeys";
import massiveEmployeeService from "../Services/massiveEmployeeService";
import { IMassiveEmployee } from "../Types/IMassiveEmployee";

const useMassiveEmployeeQuery = (
    params: IParamsApi,
    dependencies: boolean[]
) => {
    return useQuery<IResponse<IMassiveEmployee>, Error>({
        queryKey: [CACHE_KEY_MASSIVE_EMPLOYEE, params, dependencies],
        queryFn: () => massiveEmployeeService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useMassiveEmployeeQuery;
