import ApiService from "@/services/ApiService";
import { IWorkSchedulerPlan } from "../Types/IWorkSchedulerPlan";
import { IWorkSchedulerPlanRequest } from "../Types/IWorkSchedulerPlanRequest";

const workSchedulerPlanService = new ApiService<IWorkSchedulerPlanRequest, IWorkSchedulerPlan[]>(
    "employee/workScheduler/workSchedulerPlan/"
);
export default workSchedulerPlanService;