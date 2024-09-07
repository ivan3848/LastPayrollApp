import ApiService from "@/services/ApiService";

const leaseService = new ApiService<ILease, ILease>("employee/lease");

const addLeaseService = new ApiService<ILease, ILease>("employee/lease");
const addLeasePaymentService = new ApiService<ILease, ILease>("employee/leaseDetail/payment");

const leaseByIdEmployeeService = new ApiService<ILease[], ILease>(
    `employee/lease/byIdEmployee/`
);

export default leaseService;
export { leaseByIdEmployeeService, addLeaseService, addLeasePaymentService };