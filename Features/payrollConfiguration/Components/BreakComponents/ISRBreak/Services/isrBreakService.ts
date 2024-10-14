import ApiService from "@/services/ApiService";
import IISRBreak from "../Types/IISRBreak";

const ISRBreakUpdate = new ApiService<IISRBreak, IISRBreak>(
    "employee/payrollConfiguration/UpdateISRBreak"
);

export { ISRBreakUpdate };
