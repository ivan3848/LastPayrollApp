import ApiService from "@/services/ApiService";
import { ICommission } from "../Types/ICommission";
import { IInsertCommission } from "../Types/IInsertCommission";
import { ICommissionDetailArchive } from "../Types/ICommissionDetail";

const commissionService = new ApiService<IInsertCommission, IInsertCommission>(
    "employee/commission/archive"
);

const commissionServiceToInsert = new ApiService<ICommission, ICommission>(
    "employee/commissionDetail"
);

const addCommissionService = new ApiService<ICommission, ICommission>(
    "employee/commission"
);

const commissionByIdEmployeeService = new ApiService<
    ICommission[],
    ICommission
>(`employee/commission/byIdEmployee/`);

const addCommissionArchiveService = new ApiService<
    ICommissionDetailArchive,
    ICommissionDetailArchive
>("employee/commission/archive");

export default commissionService;
export {
    commissionByIdEmployeeService,
    addCommissionService,
    addCommissionArchiveService,
    commissionServiceToInsert,
};
