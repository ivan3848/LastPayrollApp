import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { workSchedulerSubstituteByIdEmployeeService } from "../Services/workSchedulerSubstituteService";
import { CACHE_KEY_WORKSCHEDULERSUBSTITUTE } from "@/constants/cacheKeys";

const useGetWorkSchedulerSubstituteByIdEmployee = (
    params: IParamsApi,
    dependencies: boolean[],
    idEmployee: number
) => {
    return useQuery<IWorkSchedulerSubstitute[], Error>({
        queryKey: [CACHE_KEY_WORKSCHEDULERSUBSTITUTE, params, dependencies, idEmployee],
        queryFn: () => workSchedulerSubstituteByIdEmployeeService.getEntitiesById(idEmployee),
        initialData: [],
    });
};

export default useGetWorkSchedulerSubstituteByIdEmployee;