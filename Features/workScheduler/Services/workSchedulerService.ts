import ApiService from "@/services/ApiService";
import { IWorkScheduler } from "../Types/IWorkScheduler";

const workSchedulerService = new ApiService<IWorkScheduler, IWorkScheduler>(
    "employee/workScheduler"
);
export default workSchedulerService;
