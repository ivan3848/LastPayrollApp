import ApiService from "@/services/ApiService";

const payrollManagementService = new ApiService<IPayrollManagement, IPayrollManagement>("employee/payrollManagement");
const lastPayrollManagementService = new ApiService<IPayrollManagement, IPayrollManagement>("employee/payrollManagment/byIdPayrollArea/");
const payrollManagementByPayrollAreService = new ApiService<IPayrollManagementByPayrollArea, IPayrollManagement>("employee/payrollManagment/byPayrollArea/");

export default payrollManagementService;
export { payrollManagementByPayrollAreService, lastPayrollManagementService }