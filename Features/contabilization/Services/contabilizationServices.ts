import ApiService from "@/services/ApiService";

const contabilizationService = new ApiService<IContabilization, IAllPayrollPay>("employee/payrollPay/getGroupContabilizationDataByIdPayrollPay/");
export default contabilizationService;