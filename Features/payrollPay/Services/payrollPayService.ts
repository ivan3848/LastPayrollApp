import ApiService from "@/services/ApiService";
import { IPayrollPay } from "../types/IPayrollPay";

const payrollPayService = new ApiService<IPayrollPay, IPayrollPay>(
    "employee/payrollPay"
);
export default payrollPayService;
