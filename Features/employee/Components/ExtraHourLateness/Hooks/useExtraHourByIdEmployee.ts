import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_EXTRAHOUR_LATENESS } from "@/constants/cacheKeys";
import { extraHourLatenessByIdEmployeeService } from "../Services/extraHourLatenessServices";



const useExtraHourLatenessByIdEmployee = (
    params: IParamsApi,
    dependencies: boolean[],
    idEmployee: number
) => {
    return useQuery<IExtraHourLateness[], Error>({
        queryKey: [CACHE_KEY_EXTRAHOUR_LATENESS, params, dependencies, idEmployee],
        queryFn: () => extraHourLatenessByIdEmployeeService.getEntitiesById(idEmployee),
        initialData: [],
    });
};

export default useExtraHourLatenessByIdEmployee;