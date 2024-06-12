import ApiService from "@/services/ApiService";
import { IBank } from "../Types/IBank";

const bankService = new ApiService<IBank, IBank>("employee/bank");
export default bankService;