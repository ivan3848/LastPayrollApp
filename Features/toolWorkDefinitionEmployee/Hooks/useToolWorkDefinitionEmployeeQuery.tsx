import IParamsApi from "@/types/IParamApi";
import { IToolWorkDefinitionEmployee } from "../Types/IToolWorkDefinitionEmployee";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import toolWorkDefinitionEmployeeService from "../Services/toolWorkDefinitionEmployeeService";
import { CACHE_KEY_TOOLWORK_DEFINITION } from "@/constants/cacheKeys";

const useToolWorkDefinitionEmployeeQuery = (
    params: IParamsApi,
    dependencies: boolean[]
) => {
    return useQuery<IResponse<IToolWorkDefinitionEmployee>, Error>({
        queryKey: [CACHE_KEY_TOOLWORK_DEFINITION, params, dependencies],
        queryFn: () => toolWorkDefinitionEmployeeService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useToolWorkDefinitionEmployeeQuery;
