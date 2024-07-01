import { CACHE_KEY_HIERARCHY_POSITION_SALARY} from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import hierarchyPositionService from "../Services/hierarchyPositionService";

const useHierarchySalaryQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IPositionSalary>, Error>({
        queryKey: [CACHE_KEY_HIERARCHY_POSITION_SALARY, params, dependencies],
        queryFn: () => hierarchyPositionService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useHierarchySalaryQuery;
