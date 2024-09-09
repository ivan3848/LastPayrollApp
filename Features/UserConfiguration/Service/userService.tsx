import ApiService from "@/services/ApiService";
import { IInsertUser } from "../Types/IInsertUser";
import { IUser } from "../Types/IUser";

const userServiceWithOut = new ApiService<IUser, IUser>(
    "employee/employee/getEmployeeWithOutLogin"
);

const userServiceWithLogin = new ApiService<IUser, IUser>(
    "employee/employee/getEmployeeWithLogin"
);

const userInsertService = new ApiService<IInsertUser, IInsertUser>(
    "employee/user/"
);

export default userServiceWithOut;
export { userInsertService, userServiceWithLogin };
