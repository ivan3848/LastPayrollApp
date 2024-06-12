import { CACHE_KEY_BANK } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import bankService from "../Services/bankService";
import { useQuery } from "@tanstack/react-query";
import { IBank } from "../Types/IBank";

const useBankQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IBank>, Error>({
        queryKey: [CACHE_KEY_BANK, params, dependencies],
        queryFn: () => bankService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useBankQuery;
