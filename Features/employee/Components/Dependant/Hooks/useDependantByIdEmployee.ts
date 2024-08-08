import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_DEPENDANT } from "@/constants/cacheKeys";
import { IDependant } from "../Types/IDependant";
import { dependantByIdEmployeeService } from "../Services/dependantService";

const useDependantHistoryById = (
    params: IParamsApi,
    dependencies: boolean[],
    idEmployee: number
) => {
    return useQuery<IDependant[], Error>({
        queryKey: [CACHE_KEY_DEPENDANT, params, dependencies, idEmployee],
        queryFn: () => dependantByIdEmployeeService.getEntitiesById(idEmployee),
        initialData: [],
    });
};

export default useDependantHistoryById;
