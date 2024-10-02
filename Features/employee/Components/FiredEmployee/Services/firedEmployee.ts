import ApiService from "@/services/ApiService";
import { IFiredEmployeeContabilization, IFireEmployee, IFireEmployeeResponse } from "../Types/IFiredEmployee";

const firedEmployeeService = new ApiService<IFireEmployee, IFireEmployeeResponse>("employee/fireEmployee");
const getAllFiredEmployeeService = new ApiService<IFireEmployee, IFireEmployee>("employee/fireEmployee");
const contabilizationFiredEmployeeService = new ApiService<IFireEmployee[], IFiredEmployeeContabilization[]>("employee/payrollPay/FiredEmployeeContabilizationByIdEmployee/");


export default firedEmployeeService;
export { getAllFiredEmployeeService, contabilizationFiredEmployeeService };
