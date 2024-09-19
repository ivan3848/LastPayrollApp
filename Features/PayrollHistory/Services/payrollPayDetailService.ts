import { IPayrollPay } from "@/Features/payrollPay/types/IPayrollPay";
import ApiService from "@/services/ApiService";

const payrollPayDetailService = new ApiService<IPayrollPay, IPayrollPayResume>("employee/payrollPay/payrollDetail/");
const payrollPayDetailNotPaidService = new ApiService<IPayrollPay, IPayrollPayResume>("employee/payrollPay/payrollDetailNotPaid/");

export default payrollPayDetailService;
export { payrollPayDetailNotPaidService };