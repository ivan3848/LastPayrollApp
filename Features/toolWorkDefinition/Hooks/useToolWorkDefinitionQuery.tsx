import IParamsApi from "@/types/IParamApi";
import { IToolWorkDefinition } from "../Types/IToolWorkDefinition";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import toolWorkDefinitionService from "../Services/toolWorkDefinitionService";
import { CACHE_KEY_TOOLWORK_DEFINITION } from "@/constants/cacheKeys";

const useToolWorkDefinitionQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IToolWorkDefinition>, Error>({
        queryKey: [CACHE_KEY_TOOLWORK_DEFINITION, params, dependencies],
        queryFn: () => toolWorkDefinitionService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useToolWorkDefinitionQuery;
