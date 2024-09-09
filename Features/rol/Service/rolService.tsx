import ApiService from "@/services/ApiService";
import IRol from "../Types/IRol";

const rolService = new ApiService<IRol, IRol>("employee/rol");

export default rolService;
// export { userInsertConfigurationService };
