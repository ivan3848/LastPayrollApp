import ApiService from "@/services/ApiService";
import IRolModule from "../Types/IRolModule";
import IRol from "@/Features/rol/Types/IRol";

const rolModuleService = new ApiService<IRol, IRol>("employee/rolmodule");

// const addRolModule = new ApiService<IDependant, IDependant>(
//     "employee/dependant"
// );

const rolModuleByIdRolService = new ApiService<IRolModule[], IRolModule>(
    `employee/rolModule/byIdRol/`
);

export default rolModuleService;
export { rolModuleByIdRolService };
