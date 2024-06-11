import ApiService from "@/services/ApiService";
import { IStatus } from "../Types/IStatus";

const statusService = new ApiService<IStatus, IStatus>("employee/status");
const statusByTableNameService = new ApiService<IStatus, IStatus[]>("employee/status/byTableName/");

export default statusService; 
export { statusByTableNameService }