import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_COVER_VACATION } from "@/constants/cacheKeys";
import { vacationByIdEmployeeService } from "../Services/vacationService";

const useGetPermitByIdEmployee = (
    params: IParamsApi,
    dependencies: boolean[],
    idEmployee: number
) => {
    return useQuery<IVacation[], Error>({
        queryKey: [CACHE_KEY_COVER_VACATION, params, dependencies, idEmployee],
        queryFn: () => vacationByIdEmployeeService.getEntitiesById(idEmployee),
        initialData: [],
    });
};

export default useGetPermitByIdEmployee;