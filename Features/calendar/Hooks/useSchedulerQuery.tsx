import { CACHE_KEY_SCHEDULER } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import schedulerService from "../Services/schedulerService";
import { IScheduler } from "../Types/IScheduler";
import { useQuery } from "@tanstack/react-query";

const useSchedulerQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IScheduler>, Error>({
        queryKey: [CACHE_KEY_SCHEDULER, params, dependencies],
        queryFn: () => schedulerService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useSchedulerQuery;
