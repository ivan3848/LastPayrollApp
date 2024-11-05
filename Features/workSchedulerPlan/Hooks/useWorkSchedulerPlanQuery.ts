// import { CACHE_KEY_WORK_SCHEDULER_PLAN } from "@/constants/cacheKeys";
// import { IWorkScheduler } from "@/Features/workScheduler/Types/IWorkScheduler";
// import IParamsApi from "@/types/IParamApi";
// import IResponse from "@/types/IResponse";
// import { useQuery } from "@tanstack/react-query";
// import workSchedulerPlanService from "../Services/workSchedulerPlanService";
// import { IWorkSchedulerPlan } from "../Types/IWorkSchedulerPlan";
// import { IWorkSchedulerPlanRequest } from "../Types/IWorkSchedulerPlanRequest";

// const useWorkSchedulerPlanQuery = (params: IWorkSchedulerPlanRequest, dependencies: boolean[]) => {
//     return useQuery<IResponse<IWorkSchedulerPlan[]>, Error>({
//         queryKey: [CACHE_KEY_WORK_SCHEDULER_PLAN, params, dependencies],
//         queryFn: () => workSchedulerPlanService.post(params),
//         initialData: { items: [] },
//     });
// };

// export default useWorkSchedulerPlanQuery;