import ApiService from "@/services/ApiService";

const contabilizationService = new ApiService<IContabilization, IContabilization>("employee/payrollPay/getContabilizationDataByIdPayrollPay/");
const contabilizationDifferenceService = new ApiService<IContabilizationDifference, IContabilizationDifference>("employee/payrollPay/contabilizationDifference/");

export default contabilizationService;
export { contabilizationDifferenceService };