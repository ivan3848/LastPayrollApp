import ApiService from "@/services/ApiService";
import { IAccountingAccount } from "../Types/IAccountingAccount";

const accountingAccountService = new ApiService<IAccountingAccount, IAccountingAccount>("employee/accountingAccount");
export default accountingAccountService;