import { CACHE_KEY_POSITION_TOOLWORK_DEFINITION } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import toolWorkPositionService from "../Services/toolWorkPositionService";
import { useQuery } from "@tanstack/react-query";
import { IToolWorkPosition } from "../Types/IToolWorkPosition";

const useToolWorkPositionQuery = (
    params: IParamsApi,
    dependencies: boolean[]
) => {
    return useQuery<IResponse<IToolWorkPosition>, Error>({
        queryKey: [CACHE_KEY_POSITION_TOOLWORK_DEFINITION, params, dependencies],
        queryFn: () => toolWorkPositionService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useToolWorkPositionQuery;
