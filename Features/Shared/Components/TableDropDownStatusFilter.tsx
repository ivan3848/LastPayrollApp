import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { DefinedUseQueryResult } from "@tanstack/react-query";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useState } from "react";
import { useParamAllData } from "../Hooks/useParamFilter";

interface Props<T> {
    column: string;
    useQuery: (
        tableName: string,
        dependencies: boolean[]
    ) => DefinedUseQueryResult<T[], Error>;
    text: string;
    setFilters: (
        filters: {
            column: string;
            value: string | number;
        }[]
    ) => void;
    clearFilters: () => void;
    tableName: string;
}
function TableDropDownStatusFilter<T>({
    column,
    useQuery,
    text,
    setFilters,
    clearFilters,
    tableName,
}: Props<T>) {
    const [id, setId] = useState(null);
    const { data } = useQuery(tableName, []);

    return (
        <Dropdown
            value={data.find((item: any) => item[column] === id) || null}
            onChange={(event: DropdownChangeEvent) => {
                if (event.value) {
                    setId(event.value[column]);
                    setFilters([
                        { column: column, value: event.value[column] },
                    ]);
                    return;
                }
                setId(null);
                clearFilters();
            }}
            options={data}
            optionLabel={text}
            placeholder="Seleccione una opción..."
            filter
            showClear
            className="w-full"
        />
    );
}

export default TableDropDownStatusFilter;
