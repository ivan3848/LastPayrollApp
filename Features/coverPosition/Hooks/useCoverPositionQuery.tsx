import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { ICoverPosition } from "../Types/ICoverPosition";
import { CACHE_KEY_COVER_POSITION } from "@/constants/cacheKeys";
import { coverPositionByIdEmployee } from "../Services/coverPositionService";

const useCoverPositionQuery = (
    params: IParamsApi,
    dependencies: boolean[],
    idEmployee: number
) => {
    return useQuery<ICoverPosition[], Error>({
        queryKey: [CACHE_KEY_COVER_POSITION, params, dependencies, idEmployee],
        queryFn: () =>
            coverPositionByIdEmployee.getById(idEmployee),
        initialData: [],
    });
};

export default useCoverPositionQuery;
