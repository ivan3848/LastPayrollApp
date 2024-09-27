import ApiService from "@/services/ApiService";
import { IPaymentLoad, IPayrollPay } from "../types/IPayrollPay";
import { IEmployee } from "@/Features/employee/Types/IEmployee";
import { IDeletePayrollPayDto } from "../Components/DeletePayrollDialog";
import { IGetPaymentLoadsDto } from "../Components/GenerateFiles";

const payrollPayService = new ApiService<IPayrollPay, IPayrollPay>("employee/payrollPay");
const deletePayrollPayService = new ApiService<IDeletePayrollPayDto, IPayrollPay>("employee/payrollPay/delete");
const employeesForPayrollPayService = new ApiService<number[], IEmployee[]>("employee/payrollPay/byIdEmployees");
const generatePayrollPayService = new ApiService<IPayrollPay, IPayrollPay>("employee/payrollPay/generatePayroll");
const generateFilesService = new ApiService<IGetPaymentLoadsDto, IPaymentLoad>("employee/payrollPay/downloadPayrollPaymentTxt");


export default payrollPayService;

export {
    generatePayrollPayService,
    employeesForPayrollPayService,
    deletePayrollPayService,
    generateFilesService
};

