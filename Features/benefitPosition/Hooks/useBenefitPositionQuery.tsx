import { CACHE_KEY_BENEFIT_POSITION } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import benefitPositionService from "../Services/benefitPositionService";
import { useQuery } from "@tanstack/react-query";
import { IBenefitPosition } from "../Types/IBenefitPosition";

const useBenefitPositionQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IBenefitPosition>, Error>({
        queryKey: [CACHE_KEY_BENEFIT_POSITION, params, dependencies],
        queryFn: () => benefitPositionService.getForTable(params), 
        initialData: { items: [] },
    });
};

export default useBenefitPositionQuery;
