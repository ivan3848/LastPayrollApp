import ApiService from "@/services/ApiService";
import { IMassiveIncrease } from "../Types/IMassiveIncrease";

const massiveIncreaseService = new ApiService<IMassiveIncrease, IMassiveIncrease>("employee/massiveIncrease");
export default massiveIncreaseService;