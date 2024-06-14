import { CACHE_KEY_DEPARTMENT } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";

import { useQuery } from "@tanstack/react-query";
import { IWorkScheduler } from "../Types/IWorkScheduler";
import workSchedulerService from "../Services/workSchedulerService";
import IResponse from "@/types/IResponse";

const useWorkSchedulerQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IWorkScheduler>, Error>({
        queryKey: [CACHE_KEY_DEPARTMENT, params, dependencies],
        queryFn: () => workSchedulerService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useWorkSchedulerQuery;
