import ApiService from "@/services/ApiService";


const personInsurance = new ApiService<IPersonInsurance, IPersonInsurance>(
    "employee/personInsurance"
);

const personInsuranceById = new ApiService<IPersonInsurance, IPersonInsurance>(
    "employee/personInsurance/id/"
);

const personInsuranceByIdEmployee = new ApiService<IPersonInsurance, IPersonInsurance>(
    "employee/personInsurance/byIdEmployee/"
);

export default personInsurance;
export {  personInsuranceById, personInsuranceByIdEmployee };