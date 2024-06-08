import { useState } from "react";
import { produce } from "immer";
import IParamsApi from "@/types/IParamApi";

interface Props {
    tableName: string;
}

const useParamFilter = () => {
    const [params, setParams] = useState<IParamsApi>({
        filter: { page: 1, pageSize: 5 },
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

    const setSorts = (
        sorts: { sortBy: string; isAsc: boolean }[]
    ) => {
        setParams((currentParams) =>
            produce(currentParams, (draft) => {
                draft.filter!.sorts = sorts;
            })
        );
    };

    const clearFilter = () =>
        setParams({
            filter: { page: 1, pageSize: 5 },
        });

    return {
        setPage,
        setPageSize,
        setGlobalFilter,
        setFilters,
        setSorts,
        clearFilter,
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

    const clearFilter = () =>
        setParams({
            filter: { page: 1, pageSize: 5 },
        });

    return {
        setPage,
        setPageSize,
        setGlobalFilter,
        setFilters,
        clearFilter,
        params,
    };
};

export default useParamFilter;
export { useParamFilterByTableName };
