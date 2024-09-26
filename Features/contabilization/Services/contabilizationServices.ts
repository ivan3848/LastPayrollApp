import ApiService from "@/services/ApiService";

const contabilizationService = new ApiService<IContabilization, IContabilization>("employee/payrollPay/getContabilizationDataByIdPayrollPay/");
const contabilizationDifferenceService = new ApiService<IContabilizationDifference, IContabilizationDifference>("employee/payrollPay/contabilizationDifference/");
const secondContabilizationService = new ApiService<IContabilization, IContabilization>("employee/payrollPay/SecondContabilizationByIdPayrollPay/");

export default contabilizationService;
export { contabilizationDifferenceService, secondContabilizationService };