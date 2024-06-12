import ApiService from "@/services/ApiService";
import { IBenefitPosition } from "../Types/IBenefitPosition";

const benefitPositionService = new ApiService<IBenefitPosition, IBenefitPosition>("employee/benefitPosition");
export default benefitPositionService;