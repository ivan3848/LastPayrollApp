import ApiService from "@/services/ApiService";
import { IGroupManager } from "../Types/IGroupManager";

const groupManagerService = new ApiService<IGroupManager, IGroupManager>("employee/groupManager");
export default groupManagerService;