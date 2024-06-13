import { useState } from "react";
import { produce } from "immer";
import IParamsApi from "@/types/IParamApi";

interface Props {
    tableName: string;
}

const useParamFilter = () => {
    const [params, setParams] = useState<IParamsApi>({
        filter: { page: 1, pageSize: 5, allData: false, filters: [] },
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
    };
};

const useParamFilterByTableName = ({ tableName = "" }: Props) => {
    const [params, setParams] = useState<IParamsApi>({
        filter: {
            page: 1,
            pageSize: 5,
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

    const setSorts = (sorts: { sortBy: string; isAsc: boolean }[]) => {
        setParams((currentParams) =>
            produce(currentParams, (draft) => {
                draft.filter!.sorts = sorts;
            })
        );
    };

    return {
        setPage,
        setPageSize,
        setGlobalFilter,
        setFilters,
        clear,
        clearFilters,
        clearSorts,
        setSorts,
        params,
    };
};

const useParamAllData = () => {
    const [params, setParams] = useState<IParamsApi>({
        filter: { page: 1, pageSize: 5, allData: true },
    });

    return {
        params,
    };
};

export default useParamFilter;
export { useParamFilterByTableName };
export { useParamAllData };
