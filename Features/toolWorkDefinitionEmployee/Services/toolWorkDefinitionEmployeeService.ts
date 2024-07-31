import ApiService from "@/services/ApiService";
import { IToolWorkDefinitionEmployee } from "../Types/IToolWorkDefinitionEmployee";

const toolWorkDefinitionEmployeeService = new ApiService<IToolWorkDefinitionEmployee, IToolWorkDefinitionEmployee>("employee/ToolWorkDefinitionEmployee");
const toolWorkDefinitionEmployeeByIdEmployee = new ApiService<IToolWorkDefinitionEmployee, IToolWorkDefinitionEmployee>(`employee/toolWorkDefinitionEmployee/byIdEmployee/`);

export default toolWorkDefinitionEmployeeService;
export { toolWorkDefinitionEmployeeByIdEmployee };