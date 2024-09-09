import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_ARCHIVE_COMMISSION } from "@/constants/cacheKeys";
import { ICommission } from "../Types/ICommission";
import { addCommissionService } from "../Services/commissionService";

const useCommissionArchiveQuery = (
    params: IParamsApi,
    dependencies: boolean[]
) => {
    return useQuery<IResponse<ICommission>, Error>({
        queryKey: [CACHE_KEY_ARCHIVE_COMMISSION, params, dependencies],
        queryFn: () => addCommissionService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useCommissionArchiveQuery;
