import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_LEASE } from "@/constants/cacheKeys";
import { leasePauseByIdEmployeeService } from "../Services/LeasePauseService";

const useGetLeasePauseByIdEmployee = (
    params: IParamsApi,
    dependencies: boolean[],
    idEmployee: number
) => {
    return useQuery<ILeasePause[], Error>({
        queryKey: [CACHE_KEY_LEASE, params, dependencies, idEmployee],
        queryFn: () => leasePauseByIdEmployeeService.getEntitiesById(idEmployee),
        initialData: [],
    });
};

export default useGetLeasePauseByIdEmployee;