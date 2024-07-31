import IParamsApi from "@/types/IParamApi";
import { IToolWorkDefinitionEmployee } from "../Types/IToolWorkDefinitionEmployee";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TOOLWORK_DEFINITION_EMPLOYEE } from "@/constants/cacheKeys";
import { toolWorkDefinitionEmployeeByIdEmployee } from "../Services/toolWorkDefinitionEmployeeService";

// const useToolWorkDefinitionEmployeeForTableQuery = (
//     params: IParamsApi,
//     dependencies: boolean[]
// ) => {
//     return useQuery<IResponse<IToolWorkDefinitionEmployee>, Error>({
//         queryKey: [
//             CACHE_KEY_TOOLWORK_DEFINITION_EMPLOYEE,
//             params,
//             dependencies,
//         ],
//         queryFn: () =>
//             toolWorkDefinitionEmployeeByIdEmployee.getForTable(params),
//         initialData: { items: [] },
//     });
// };

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
            toolWorkDefinitionEmployeeByIdEmployee.getById(idEmployee),
        initialData: [],
    });
};

export default useToolWorkDefinitionEmployeeQuery;
