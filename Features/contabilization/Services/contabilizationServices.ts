import ApiService from "@/services/ApiService";

const contabilizationService = new ApiService<IContabilization, IContabilization>("employee/payrollPay/contabilizationByIdPayrollPay");
export default contabilizationService;