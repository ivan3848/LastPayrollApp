import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_DEPENDANT } from "@/constants/cacheKeys";
import { IDependant } from "../Types/IDependant";
import dependantService from "../Services/dependantService";

const useDependantService = (
    params: IParamsApi,
    dependencies: boolean[],
    idEmployee: number
) => {
    return useQuery<IDependant[], Error>({
        queryKey: [CACHE_KEY_DEPENDANT, params, dependencies, idEmployee],
        queryFn: () => dependantService.getById(idEmployee),
        initialData: [],
    });
};

export default useDependantService;
