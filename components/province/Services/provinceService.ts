import ApiService from "@/services/ApiService";
import { IProvince } from "../Types/IProvince";

const provinceService = new ApiService<IProvince, IProvince>("employee/province");
export default provinceService;