import ApiService from "@/services/ApiService";
import { ILeaseDetail } from "../Types/ILeaseDetail";

const leaseDetailService = new ApiService<ILease, ILease>("employee/leasedetail");

const leaseDetailByIdLeaseService = new ApiService<ILeaseDetail[], ILeaseDetail>(
    `employee/leasedetail/byIdLease/`
);

export default leaseDetailService;
export { leaseDetailByIdLeaseService };