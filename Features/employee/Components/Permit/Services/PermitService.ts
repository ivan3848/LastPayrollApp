import ApiService from "@/services/ApiService";

const permitService = new ApiService<IPermit, IPermit>("employee/permit");

const addPermitService = new ApiService<IPermit, IPermit>("employee/permit");

const permitByIdEmployeeService = new ApiService<IPermit[], IPermit>(
    `employee/permit/byIdEmployee/`
);

export default permitService;
export { permitByIdEmployeeService, addPermitService };