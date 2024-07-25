import ApiService from "@/services/ApiService";
import { IDependant } from "../Types/IDependant";

const dependantService = new ApiService<IDependant, IDependant>(
    "employee/dependant"
);

const addDependantService = new ApiService<IDependant, IDependant>(
    "employee/dependant"
);

const dependantByIdEmployeeService = new ApiService<IDependant, IDependant>(
    `employee/dependant/byIdEmployee/`
);

export default dependantService;
export { dependantByIdEmployeeService, addDependantService };
