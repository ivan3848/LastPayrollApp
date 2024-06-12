import ApiService from "@/services/ApiService";
import { IToolWorkPosition } from "../Types/IToolWorkPosition";

const toolWorkPositionService = new ApiService<IToolWorkPosition, IToolWorkPosition>("employee/positionToolWorkDefinition");
export default toolWorkPositionService;