import ApiService from "@/services/ApiService";

const leasePauseService = new ApiService<ILeasePause, ILeasePause>("employee/leasepause");

const addLeasePauseService = new ApiService<ILeasePause, ILeasePause>("employee/leasepause");

const leasePauseByIdEmployeeService = new ApiService<ILeasePause[], ILeasePause>(
    `employee/leasepause/byIdEmployee/`
);

export default leasePauseService;
export { leasePauseByIdEmployeeService, addLeasePauseService };