import ApiService from "@/services/ApiService";
import { IProfit } from "../Types/IProfit";

const profitService = new ApiService<IProfit, IProfit>("employee/profit");

const addProfitService = new ApiService<IProfit, IProfit>("employee/profit");

const profitByIdEmployeeService = new ApiService<IProfit[], IProfit>(
    `employee/profit/byIdEmployee/`
);

export default profitService;
export { profitByIdEmployeeService, addProfitService };
