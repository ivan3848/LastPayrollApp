import IParamsApi from "@/types/IParamApi";
import { IAccountingAccount } from "../Types/IAccountingAccount";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import accountingAccountService from "../Services/accountingAccountService";
import { CACHE_KEY_ACCOUNTINGACCOUNT } from "@/constants/cacheKeys";

const useAccountingAccountQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IAccountingAccount>, Error>({
        queryKey: [CACHE_KEY_ACCOUNTINGACCOUNT, params, dependencies],
        queryFn: () => accountingAccountService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useAccountingAccountQuery;
