import { CACHE_KEY_SECTOR } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import { ISector } from "../Types/ISector";
import IResponse from "@/types/IResponse";
import sectorService from "../Services/sectorService";
import { useQuery } from "@tanstack/react-query";

const useSectorQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<ISector>, Error>({
        queryKey: [CACHE_KEY_SECTOR, params, dependencies],
        queryFn: () => sectorService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useSectorQuery;
