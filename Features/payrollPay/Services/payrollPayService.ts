import ApiService from "@/services/ApiService";
import { IPayrollPay } from "../types/IPayrollPay";
import { IAddEmployee } from "../Components/AddOrExcludeEmployee";
import { IEmployee } from "@/Features/employee/Types/IEmployee";

const payrollPayService = new ApiService<IPayrollPay, IPayrollPay>("employee/payrollPay");
const employeesForPayrollPayService = new ApiService<number[], IEmployee[]>("employee/payrollPay/byIdEmployees");
const generatePayrollPayService = new ApiService<IPayrollPay, IPayrollPay>("employee/payrollPay/generatePayroll");

export default payrollPayService;
export {generatePayrollPayService, employeesForPayrollPayService};
