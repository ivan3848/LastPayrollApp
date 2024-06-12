import ApiService from "@/services/ApiService";
import { ICountry } from "../Types/ICountry";

const countryService = new ApiService<ICountry, ICountry>("employee/country");
export default countryService;