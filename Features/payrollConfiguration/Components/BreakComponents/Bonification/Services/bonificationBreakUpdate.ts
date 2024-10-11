import ApiService from "@/services/ApiService";
import IBonificationBreak from "../Types/IBonificationBreak";

const bonificationBreakUpdate = new ApiService<
    IBonificationBreak,
    IBonificationBreak
>("employee/payrollConfiguration/UpdateBonificationBreak");

export { bonificationBreakUpdate };
