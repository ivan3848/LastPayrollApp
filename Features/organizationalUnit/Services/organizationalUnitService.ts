import ApiService from "@/services/ApiService";
import { IOrganizationalUnit } from "../Types/IOrganizationalUnit";

const organizationalUnitService = new ApiService<
    IOrganizationalUnit,
    IOrganizationalUnit
>("employee/organizationalUnit");
export default organizationalUnitService;
