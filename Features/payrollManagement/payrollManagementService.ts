import ApiService from "@/services/ApiService";

const payrollManagementService = new ApiService<IPayrollManagement, IPayrollManagement>("employee/payrollManagment");
const lastPayrollManagementService = new ApiService<IPayrollManagement, IPayrollManagement>("employee/payrollManagment/byIdPayrollArea/");
const payrollManagementByPayrollAreService = new ApiService<IPayrollManagementByPayrollArea, IPayrollManagement>("employee/payrollManagment/byPayrollArea/");
const payrollManagementByPayrollNumberService = new ApiService<IPayrollManagementByPayrollNumber, IPayrollManagement>("employee/payrollManagment/byPayrollNumber/");

export default payrollManagementService;
export { payrollManagementByPayrollAreService,
    lastPayrollManagementService,
    payrollManagementByPayrollNumberService
}