import ApiService from "@/services/ApiService";
import { IPayrollConfiguration } from "../Types/IPayrollConfiguration";
import IISRBreak from "../Components/BreakComponents/ISRBreak/Types/IISRBreak";

const PayrollConfigurationService = new ApiService<
    IPayrollConfiguration,
    IPayrollConfiguration
>("employee/payrollConfiguration");

const PayrollConfigurationUpdate = new ApiService<
    IPayrollConfiguration,
    IPayrollConfiguration
>("employee/payrollConfiguration/update");

const PayrollConfigurationAddISR = new ApiService<IISRBreak, IISRBreak>(
    "employee/payrollConfiguration/add"
);

export default PayrollConfigurationService;
export { PayrollConfigurationUpdate, PayrollConfigurationAddISR };
