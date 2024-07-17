import ApiService from "@/services/ApiService";
import { IToolWorkDefinitionEmployee } from "../Types/IToolWorkDefinitionEmployee";

const toolWorkDefinitionEmployeeService = new ApiService<IToolWorkDefinitionEmployee, IToolWorkDefinitionEmployee>("employee/ToolWorkDefinitionEmployee");
export default toolWorkDefinitionEmployeeService;