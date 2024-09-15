import ApiService from "@/services/ApiService";
import { IPayrollPay } from "../types/IPayrollPay";

const payrollPayService = new ApiService<IPayrollPay, IPayrollPay>("employee/payrollPay");
const generatePayrollPayService = new ApiService<IPayrollPay, IPayrollPay>("employee/payrollPay/generatePayroll");
export default payrollPayService;
export {generatePayrollPayService}
