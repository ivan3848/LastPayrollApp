import { CACHE_KEY_WORK_SCHEDULER } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { IWorkSchedulerDetail } from "../Types/IWorkSchedulerDetail";
import { workSchedulerDetailByIdService } from "../Services/workSchedulerServiceDetail";

const useWorkSchedulerDetailQuery = (params: IParamsApi, dependencies: boolean[], idWorkScheduler: number
) => {
    return useQuery<IWorkSchedulerDetail[], Error>({
        queryKey: [CACHE_KEY_WORK_SCHEDULER, params, dependencies, idWorkScheduler],
        queryFn: () => workSchedulerDetailByIdService.getEntitiesById(idWorkScheduler),
        initialData: [],
    });
};

export default useWorkSchedulerDetailQuery;
