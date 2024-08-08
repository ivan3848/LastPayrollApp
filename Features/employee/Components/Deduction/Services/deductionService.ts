import ApiService from "@/services/ApiService";
import { IDeduction } from "../Types/IDeduction";

const deductionService = new ApiService<IDeduction, IDeduction>(
    "employee/deduction"
);

const addDeductionService = new ApiService<IDeduction, IDeduction>(
    "employee/deduction"
);

const deductionByIdEmployeeService = new ApiService<IDeduction[], IDeduction>(
    `employee/deduction/byIdEmployee/`
);

export default deductionService;
export { deductionByIdEmployeeService, addDeductionService };
