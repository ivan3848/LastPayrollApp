import IParamsApi from "@/types/IParamApi";
import { IContractType } from "../Types/IContractType";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import contractTypeService from "../Services/contractTypeService";
import { CACHE_KEY_CONTRACT_TYPE } from "@/constants/cacheKeys";

const useContractTypeQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IContractType>, Error>({
        queryKey: [CACHE_KEY_CONTRACT_TYPE, params, dependencies],
        queryFn: () => contractTypeService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useContractTypeQuery;
