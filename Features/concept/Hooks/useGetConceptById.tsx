import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_ROL_MODULE } from "@/constants/cacheKeys";
import { IConcept } from "../Types/IConcept";
import conceptService from "../Services/conceptService";

const useGetConceptById = (
    params: IParamsApi,
    dependencies: boolean[],
    idConcept: number
) => {
    return useQuery<IConcept[], Error>({
        queryKey: [CACHE_KEY_ROL_MODULE, params, dependencies, idConcept],
        queryFn: async () => [await conceptService.getById(idConcept)],
        initialData: [],
    });
};

export default useGetConceptById;
