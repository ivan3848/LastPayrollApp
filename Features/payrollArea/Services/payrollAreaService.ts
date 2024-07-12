import ApiService from "@/services/ApiService";
import { IPayrollArea } from "../Types/IPayrollArea";

const payrollAreaService = new ApiService<IPayrollArea, IPayrollArea>("employee/payrollArea");
export default payrollAreaService;