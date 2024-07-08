import ApiService from "@/services/ApiService";
import { IBankEmployeeHistory } from "../types/IBankEmployeeHistory";


const bankEmployeeHistory = new ApiService<IBankEmployeeHistory, IBankEmployeeHistory>(
    "employee/bankEmployeeHistory"
);

const bankEmployeeHistoryByIdEmployee = new ApiService<IBankEmployeeHistory, IBankEmployeeHistory>(
    `employee/bankEmployeeHistory/byIdEmployee/`
);

export default bankEmployeeHistory;
export {  bankEmployeeHistoryByIdEmployee };
