import { useState } from "react";
import { produce } from "immer";
import IParamsApi from "@/types/IParamApi";

interface Props {
    tableName: string;
    pageSize?: number;
}

const useParamFilter = (pageSize: number = 5) => {
    const [params, setParams] = useState<IParamsApi>({
        filter: { page: 1, pageSize: pageSize, allData: false, filters: [] },
    });

    const setPage = (page: number) =>
        setParams((currentParams) =>
            produce(currentParams, (draft) => {
                draft.filter.page = page;
            })
        );

    const setPageSize = (pageSize: number) =>
        setParams((currentParams) =>
            produce(currentParams, (draft) => {
                draft.filter.pageSize = pageSize;
            })
        );

    const setGlobalFilter = (globalFilter: string) =>
        setParams((currentParams) =>
            produce(currentParams, (draft) => {
                draft.filter.globalFilter = globalFilter;
            })
        );

    const setFilters = (filters: { column: string; value: any }[]) => {
        setParams((currentParams) =>
            produce(currentParams, (draft) => {
                draft.filter!.filters = filters;
            })
        );
    };

    const setSorts = (sorts: { sortBy: string; isAsc: boolean }[]) => {
        setParams((currentParams) =>
            produce(currentParams, (draft) => {
                draft.filter!.sorts = sorts;
            })
        );
    };

    const clearFilters = () => {
        setParams((currentParams) =>
            produce(currentParams, (draft) => {
                if (draft.filter) {
                    draft.filter.filters = [];
                }
            })
        );
    };

    const clearSorts = () => {
        setParams((currentParams) =>
            produce(currentParams, (draft) => {
                draft.filter!.sorts = [];
            })
        );
    };

    const clear = () =>
        setParams({
            filter: { page: 1, pageSize: 5, allData: false, filters: [] },
        });

    const setAllData = (allData: boolean) => {
        setParams((currentParams) =>
            produce(currentParams, (draft) => {
                draft.filter!.allData = allData;
            })
        );
    };

    return {
        setPage,
        setPageSize,
        setGlobalFilter,
        setFilters,
        setSorts,
        clear,
        clearFilters,
        clearSorts,
        params,
        setAllData,
    };
};

const useParamFilterByTableName = ({ tableName = "", pageSize = 5 }: Props) => {
    const [params, setParams] = useState<IParamsApi>({
        filter: {
            page: 1,
            pageSize: pageSize,
            filters: [{ column: "tableName", value: tableName! }],
        },
    });

    const setPage = (page: number) =>
        setParams((currentParams) =>
            produce(currentParams, (draft) => {
                draft.filter.page = page;
            })
        );

    const setPageSize = (pageSize: number) =>
        setParams((currentParams) =>
            produce(currentParams, (draft) => {
                draft.filter.pageSize = pageSize;
            })
        );

    const setGlobalFilter = (globalFilter: string) =>
        setParams((currentParams) =>
            produce(currentParams, (draft) => {
                draft.filter.globalFilter = globalFilter;
            })
        );

    const setFilters = (
        filters: { column: string; value: string | number }[]
    ) => {
        filters.push({ column: "tableName", value: tableName! });

        setParams((currentParams) =>
            produce(currentParams, (draft) => {
                draft.filter!.filters = filters;
            })
        );
    };

    const clearFilters = () => {
        setParams((currentParams) =>
            produce(currentParams, (draft) => {
                if (draft.filter) {
                    draft.filter.filters = [
                        { column: "tableName", value: tableName! },
                    ];
                }
            })
        );
    };

    const clearSorts = () => {
        setParams((currentParams) =>
            produce(currentParams, (draft) => {
                draft.filter!.sorts = [];
            })
        );
    };

    const clear = () =>
        setParams({
            filter: {
                page: 1,
                pageSize: pageSize,
                allData: false,
                filters: [{ column: "tableName", value: tableName! }],
            },
        });

    const setSorts = (sorts: { sortBy: string; isAsc: boolean }[]) => {
        setParams((currentParams) =>
            produce(currentParams, (draft) => {
                draft.filter!.sorts = sorts;
            })
        );
    };

    return {
        setPageSize,
        setGlobalFilter,
        setFilters,
        clear,
        clearFilters,
        clearSorts,
        setSorts,
        setPage,
        params,
    };
};

const useParamAllData = () => {
    const [params, setParams] = useState<IParamsApi>({
        filter: { page: 1, pageSize: 5, allData: true },
    });

    return {
        params,
        setParams,
    };
};

export default useParamFilter;
export { useParamFilterByTableName };
export { useParamAllData };
