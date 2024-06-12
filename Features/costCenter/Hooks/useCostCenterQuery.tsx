import { CACHE_KEY_COSTCENTER } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { ICostCenter } from "../Types/ICostCenter";
import costCenterService from "../Services/costCenterService";

const useCostCenterQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<ICostCenter>, Error>({
        queryKey: [CACHE_KEY_COSTCENTER, params, dependencies],
        queryFn: () => costCenterService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useCostCenterQuery;
