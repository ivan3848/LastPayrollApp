import ApiService from "@/services/ApiService";
import { IPerson } from "../Types/IPerson";

const personService = new ApiService<IPerson, IPerson>("employee/person");

const personByIdService = new ApiService<IPerson, IPerson>("employee/person/");

export default personService;
export {  personByIdService };