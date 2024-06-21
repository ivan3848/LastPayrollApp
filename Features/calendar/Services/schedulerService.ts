import ApiService from "@/services/ApiService";
import { IScheduler } from "../Types/IScheduler";

const schedulerService = new ApiService<IScheduler, []>("employee/scheduler");
export default schedulerService;