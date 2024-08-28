import ApiService from "@/services/ApiService";
import { ICommissionDetail } from "../../Commission/Types/ICommissionDetail";

const commissionDetailService = new ApiService<
    ICommissionDetail,
    ICommissionDetail
>("employee/commissionDetail");

const addCommissionDetailService = new ApiService<
    ICommissionDetail,
    ICommissionDetail
>("employee/commissionDetail");

const commissionDetailByIdEmployeeService = new ApiService<
    ICommissionDetail[],
    ICommissionDetail
>(`employee/commissionDetail/byIdEmployee/`);

export default commissionDetailService;
export { commissionDetailByIdEmployeeService, addCommissionDetailService };
