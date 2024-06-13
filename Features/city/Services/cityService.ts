import ApiService from "@/services/ApiService";
import { ICity } from "../Types/ICity";

const cityService = new ApiService<ICity, ICity>("employee/city");
export default cityService;