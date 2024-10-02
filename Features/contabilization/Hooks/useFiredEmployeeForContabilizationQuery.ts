import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_FIREDEMPLOYEE_CONTABILIZATION } from "@/constants/cacheKeys";
import { IFiredEmployeeContabilization } from "@/Features/employee/Components/FiredEmployee/Types/IFiredEmployee";
import { contabilizationFiredEmployeeService } from "@/Features/employee/Components/FiredEmployee/Services/firedEmployee";

const useFiredEmployeeForContabilizationQuery = (
    params: IParamsApi,
    dependencies: boolean[],
    id: number
) => {
    return useQuery<IFiredEmployeeContabilization[], Error>({
        queryKey: [CACHE_KEY_FIREDEMPLOYEE_CONTABILIZATION, params, dependencies, id],
        queryFn: async () => {
            const result = await contabilizationFiredEmployeeService.getEntitiesById(id);
            return result.flat();
        },
        initialData: [],
    });
};

export default useFiredEmployeeForContabilizationQuery;