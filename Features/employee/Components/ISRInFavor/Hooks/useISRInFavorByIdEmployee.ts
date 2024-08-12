import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_ISR_IN_FAVOR } from "@/constants/cacheKeys";
import { IISRInFavor } from "../Types/ISRInFavor";
import { ISRInFavorByIdEmployeeService } from "../Service/isrInFavorService";

const useISRInFavorByIdEmployee = (
    params: IParamsApi,
    dependencies: boolean[],
    idEmployee: number
) => {
    return useQuery<IISRInFavor[], Error>({
        queryKey: [CACHE_KEY_ISR_IN_FAVOR, params, dependencies, idEmployee],
        queryFn: () =>
            ISRInFavorByIdEmployeeService.getEntitiesById(idEmployee),
        initialData: [],
    });
};

export default useISRInFavorByIdEmployee;
