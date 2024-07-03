import ApiService from "@/services/ApiService";
import { IPerson } from "../Types/IPerson";

const personService = new ApiService<IPerson, IPerson>("employee/person");
export default personService;