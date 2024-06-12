import ApiService from "@/services/ApiService";
import { ICostCenter } from "../Types/ICostCenter";

const costCenterService = new ApiService<ICostCenter, ICostCenter>(
    "employee/costCenter"
);
export default costCenterService;
