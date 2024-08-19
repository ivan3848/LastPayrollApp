import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import workSchedulerSubstituteService from "../Services/workSchedulerSubstituteService";
import { CACHE_KEY_WORKSCHEDULERSUBSTITUTE } from "@/constants/cacheKeys";

const useGetWorkSchedulerSubstituteByIdEmployee = (
    params: IParamsApi,
    dependencies: boolean[],
    idEmployee: number
) => {
    return useQuery<IWorkSchedulerSubstitute[], Error>({
        queryKey: [CACHE_KEY_WORKSCHEDULERSUBSTITUTE, params, dependencies, idEmployee],
        queryFn: () => workSchedulerSubstituteService.getEntitiesById(idEmployee),
        initialData: [],
    });
};

export default useGetWorkSchedulerSubstituteByIdEmployee;