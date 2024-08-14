import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_COMMISSION } from "@/constants/cacheKeys";
import { ICommission } from "../Types/ICommission";
import { commissionByIdEmployeeService } from "../Services/commissionService";

const useCommissionByIdEmployee = (
    params: IParamsApi,
    dependencies: boolean[],
    idEmployee: number
) => {
    return useQuery<ICommission[], Error>({
        queryKey: [CACHE_KEY_COMMISSION, params, dependencies, idEmployee],
        queryFn: () =>
            commissionByIdEmployeeService.getEntitiesById(idEmployee),
        initialData: [],
    });
};

export default useCommissionByIdEmployee;
