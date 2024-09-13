import ApiService from "@/services/ApiService";
import IRolModule from "../Types/IRolModule";

const rolModuleService = new ApiService<IRolModule, IRolModule>(
    "employee/dependant"
);

// const addRolModule = new ApiService<IDependant, IDependant>(
//     "employee/dependant"
// );

const rolModuleByIdRolService = new ApiService<IRolModule[], IRolModule>(
    `employee/rolModule/byIdRol/`
);

export default rolModuleService;
export { rolModuleByIdRolService };
