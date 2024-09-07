import ApiService from "@/services/ApiService";
import ILeaseDetailPayment from "../../LeaseDetail/Types/ILeaseDetailPayment";

const leaseService = new ApiService<ILease, ILease>("employee/lease");

const addLeaseService = new ApiService<ILease, ILease>("employee/lease");
const addLeasePaymentService = new ApiService<ILeaseDetailPayment, ILeaseDetailPayment>("employee/leaseDetail/payment");

const leaseByIdEmployeeService = new ApiService<ILease[], ILease>(
    `employee/lease/byIdEmployee/`
);

export default leaseService;
export { leaseByIdEmployeeService, addLeaseService, addLeasePaymentService };