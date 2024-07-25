import ApiService from "@/services/ApiService";


const personInsurance = new ApiService<IPersonInsurance, IPersonInsurance>(
    "employee/personInsurance"
);

const personInsuranceById = new ApiService<IPersonInsurance, IPersonInsurance>(
    `employee/personInsurance/Id/`
);

export default personInsurance;
export {  personInsuranceById };