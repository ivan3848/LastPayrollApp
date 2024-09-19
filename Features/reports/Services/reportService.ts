import ApiService from "@/services/ApiService";
import { IPayrollPayExpenseForReport } from "../Types/IPayrollPayExpenseForReport";

const payrollPayExpenseForReportService = new ApiService<IPayrollPayExpenseForReport[], IPayrollPayExpenseForReport>("employee/report/getAllPayrollPayExpense");
export { payrollPayExpenseForReportService }