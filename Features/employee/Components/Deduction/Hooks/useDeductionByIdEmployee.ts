import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_DEDUCTION } from "@/constants/cacheKeys";
import { deductionByIdEmployeeService } from "../Services/deductionService";
import { IDeduction } from "../Types/IDeduction";

const useDeductionByIdEmployee = (
    params: IParamsApi,
    dependencies: boolean[],
    idEmployee: number
) => {
    return useQuery<IDeduction[], Error>({
        queryKey: [CACHE_KEY_DEDUCTION, params, dependencies, idEmployee],
        queryFn: () => deductionByIdEmployeeService.getEntitiesById(idEmployee),
        initialData: [],
    });
};

export default useDeductionByIdEmployee;
