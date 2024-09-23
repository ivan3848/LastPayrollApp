import ApiService from "@/services/ApiService";
import { IInsertUser, IUserReactivation } from "../Types/IInsertUser";
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
const userUpdateService = new ApiService<IUserReactivation, IUserReactivation>(
    "employee/user/"
);
const userResetPassword = new ApiService<IUser, IUser>("employee/user/");

export default userServiceWithOut;
export {
    userInsertService,
    userResetPassword,
    userServiceWithLogin,
    userUpdateService,
};
