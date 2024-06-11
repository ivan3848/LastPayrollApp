import IParamsApi from "@/types/IParamApi";
import { ICostCenter } from "../Types/ICostCenter";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import costCenterService from "../Services/costCenterService";
import { CACHE_KEY_COSTCENTER } from "@/constants/cacheKeys";

const useCostCenterQuery = (
    params: IParamsApi,
    dependencies: boolean[]
) => {
    return useQuery<IResponse<ICostCenter>, Error>({
        queryKey: [CACHE_KEY_COSTCENTER, params, dependencies],
        queryFn: () => costCenterService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useCostCenterQuery;
