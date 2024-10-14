import ApiService from "@/services/ApiService";
import { ISeniorityIncentiveBreak } from "../Types/ISeniorityIncentive";

const SeniorityIncentiveBreakUpdateService = new ApiService<
    ISeniorityIncentiveBreak,
    ISeniorityIncentiveBreak
>("employee/payrollConfiguration/UpdateSeniorityIncentiveBreak");

export { SeniorityIncentiveBreakUpdateService };
