import ApiService from "@/services/ApiService";
import { IDependant } from "../Types/IDependant";

const dependant = new ApiService<IDependant, IDependant>("employee/dependant");

const dependantByIdEmployee = new ApiService<IDependant, IDependant>(
    `employee/dependant/byIdEmployee/`
);

export default dependant;
export { dependantByIdEmployee };
