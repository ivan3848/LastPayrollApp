import ApiService from "@/services/ApiService";
import { ILocation } from "../Types/ILocation";

const locationService = new ApiService<ILocation, ILocation>("employee/location");
export default locationService;