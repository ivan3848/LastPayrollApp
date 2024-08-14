import ApiService from "@/services/ApiService";
import { ICommission } from "../Types/ICommission";

const commissionService = new ApiService<ICommission, ICommission>(
    "employee/commission"
);

const addCommissionService = new ApiService<ICommission, ICommission>(
    "employee/commission"
);

const commissionByIdEmployeeService = new ApiService<
    ICommission[],
    ICommission
>(`employee/commission/byIdEmployee/`);

export default commissionService;
export { commissionByIdEmployeeService, addCommissionService };
