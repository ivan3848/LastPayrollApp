import ApiService from "@/services/ApiService";

const amortizationService = new ApiService<IAmortization, IAmortization>("employee/amortization");

const addAmortizationService = new ApiService<IAmortization, IAmortization>("employee/amortization");

const amortizationByIdLeaseService = new ApiService<IAmortization[], IAmortization>(
    `employee/amortization/byIdLease/`
);

export default amortizationService;
export { amortizationByIdLeaseService, addAmortizationService };