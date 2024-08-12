import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_COVER_PERMIT } from "@/constants/cacheKeys";
import { permitByIdEmployeeService } from "../Services/PermitService";

const useGetPermitByIdEmployee = (
    params: IParamsApi,
    dependencies: boolean[],
    idEmployee: number
) => {
    return useQuery<IPermit[], Error>({
        queryKey: [CACHE_KEY_COVER_PERMIT, params, dependencies, idEmployee],
        queryFn: () => permitByIdEmployeeService.getEntitiesById(idEmployee),
        initialData: [],
    });
};

export default useGetPermitByIdEmployee;