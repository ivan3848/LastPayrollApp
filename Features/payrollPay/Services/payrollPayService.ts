import ApiService from "@/services/ApiService";
import { IPayrollPay } from "../types/IPayrollPay";
import { IEmployee } from "@/Features/employee/Types/IEmployee";
import { IDeletePayrollPayDto } from "../Components/DeletePayrollDialog";

const payrollPayService = new ApiService<IPayrollPay, IPayrollPay>("employee/payrollPay");
const deletePayrollPayService = new ApiService<IDeletePayrollPayDto, IPayrollPay>("employee/payrollPay/delete");
const employeesForPayrollPayService = new ApiService<number[], IEmployee[]>("employee/payrollPay/byIdEmployees");
const generatePayrollPayService = new ApiService<IPayrollPay, IPayrollPay>("employee/payrollPay/generatePayroll");

export default payrollPayService;
export {generatePayrollPayService, employeesForPayrollPayService, deletePayrollPayService};
