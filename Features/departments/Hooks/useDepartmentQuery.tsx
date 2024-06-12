import { CACHE_KEY_DEPARTMENT } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import { IDepartment } from "../Types/IDepartment";
import IResponse from "@/types/IResponse";
import departmentService from "../Services/departmentService";
import { useQuery } from "@tanstack/react-query";

const useDepartmentQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IDepartment>, Error>({
        queryKey: [CACHE_KEY_DEPARTMENT, params, dependencies],
        queryFn: () => departmentService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useDepartmentQuery;
