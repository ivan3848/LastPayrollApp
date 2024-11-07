import ApiService from "@/services/ApiService";
import { IWorkSchedulerDetail } from "../Types/IWorkSchedulerDetail";

const workSchedulerDetailService = new ApiService<IWorkSchedulerDetail, IWorkSchedulerDetail>("employee/workSchedulerDetail");
const workSchedulerDetailByIdService = new ApiService<IWorkSchedulerDetail, IWorkSchedulerDetail>("employee/workSchedulerDetail/workScheduler/");

export default workSchedulerDetailService;
export { workSchedulerDetailByIdService };