import ApiService from "@/services/ApiService";
import { IHierarchyPosition } from "../Types/IHierarchyPosition";

const hierarchyPositionService = new ApiService<IHierarchyPosition, IHierarchyPosition>("employee/hierarchyPosition");
export default hierarchyPositionService;