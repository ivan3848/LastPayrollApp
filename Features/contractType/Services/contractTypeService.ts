import ApiService from "@/services/ApiService";
import { IContractType } from "../Types/IContractType";

const contractTypeService = new ApiService<IContractType, IContractType>("employee/contractType");
export default contractTypeService;