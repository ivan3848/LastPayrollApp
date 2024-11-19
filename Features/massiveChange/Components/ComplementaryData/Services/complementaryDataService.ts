import ApiService from "@/services/ApiService";
import { IComplementaryData } from "../Types/IComplementaryData";

const complementaryDataService = new ApiService<
    IComplementaryData,
    IComplementaryData
>("employee/complementaryData");
export default complementaryDataService;
