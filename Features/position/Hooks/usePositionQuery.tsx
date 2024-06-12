import { CACHE_KEY_POSITION } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import positionService from "../Services/positionService";
import { useQuery } from "@tanstack/react-query";
import { IPosition } from "../Types/IPosition";

const usePositionQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IPosition>, Error>({
        queryKey: [CACHE_KEY_POSITION, params, dependencies],
        queryFn: () => positionService.getForTable(params),
        initialData: { items: [] },
    });
};

export default usePositionQuery;
