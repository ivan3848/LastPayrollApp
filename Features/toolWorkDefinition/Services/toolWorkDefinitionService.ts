import ApiService from "@/services/ApiService";
import { IToolWorkDefinition } from "../Types/IToolWorkDefinition";

const toolWorkDefinitionService = new ApiService<IToolWorkDefinition, IToolWorkDefinition>("employee/toolWorkDefinition");
export default toolWorkDefinitionService;