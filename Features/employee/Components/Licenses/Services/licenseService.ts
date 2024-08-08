import ApiService from "@/services/ApiService";

const licenseService = new ApiService<ILicenses, ILicenses>("employee/license");

const addLicenseService = new ApiService<ILicenses, ILicenses>("employee/license");

const licenseByIdEmployeeService = new ApiService<ILicenses[], ILicenses>(
    `employee/license/byIdEmployee/`
);

export default licenseService;
export { licenseByIdEmployeeService, addLicenseService };
