import ApiService from "@/services/ApiService";
import { IOrganizationalUnit } from "../Types/IOrganizationalUnit";

const costCenterService = new ApiService<
    IOrganizationalUnit,
    IOrganizationalUnit
>("employee/organizationalUnit");
export default costCenterService;
