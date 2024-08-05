import IParamsApi from "@/types/IParamApi";
import { IToolWorkDefinitionEmployee } from "../Types/IToolWorkDefinitionEmployee";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TOOLWORK_DEFINITION_EMPLOYEE } from "@/constants/cacheKeys";
import { toolWorkDefinitionEmployeeByIdEmployee } from "../Services/toolWorkDefinitionEmployeeService";

const useToolWorkDefinitionEmployeeQuery = (
    params: IParamsApi,
    dependencies: boolean[],
    idEmployee: number
) => {
    return useQuery<IToolWorkDefinitionEmployee[], Error>({
        queryKey: [
            CACHE_KEY_TOOLWORK_DEFINITION_EMPLOYEE,
            params,
            dependencies,
            idEmployee,
        ],
        queryFn: () =>
            toolWorkDefinitionEmployeeByIdEmployee.getEntitiesById(idEmployee),
        initialData: [],
    });
};

export default useToolWorkDefinitionEmployeeQuery;
