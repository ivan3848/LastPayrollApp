import ApiService from "@/services/ApiService";
import { IConcept } from "../Types/IConcept";

const conceptService = new ApiService<IConcept, IConcept>("employee/concept");

const conceptByStatusCodeService = new ApiService<IConcept, IConcept[]>("employee/concept/ByStatusCode/");

export default conceptService
export { conceptByStatusCodeService };