import { CACHE_KEY_CONCEPT } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import conceptService, {
    conceptByStatusCodeService,
} from "../Services/conceptService";
import { useQuery } from "@tanstack/react-query";
import { IConcept } from "../Types/IConcept";

const useConceptQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IConcept>, Error>({
        queryKey: [CACHE_KEY_CONCEPT, params, dependencies],
        queryFn: () => conceptService.getForTable(params),
        initialData: { items: [] },
    });
};

const useConceptByStatusCodeQuery = (
    statusCode: string,
    dependencies: boolean[]
) => {
    return useQuery<IConcept[], Error>({
        queryKey: [CACHE_KEY_CONCEPT, statusCode, dependencies],
        queryFn: () => conceptByStatusCodeService.get(statusCode),
        initialData: [],
    });
};

export default useConceptQuery;
export { useConceptByStatusCodeQuery };
