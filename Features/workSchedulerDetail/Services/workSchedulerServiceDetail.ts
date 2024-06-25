import ApiService from "@/services/ApiService";
import { IWorkSchedulerDetail } from "../Types/IWorkSchedulerDetail";

const workSchedulerDetailService = new ApiService<IWorkSchedulerDetail, IWorkSchedulerDetail>("employee/workSchedulerDetail");
export default workSchedulerDetailService;