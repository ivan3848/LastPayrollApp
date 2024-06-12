import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { DefinedUseQueryResult } from "@tanstack/react-query";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useState } from "react";
import { useParamAllData } from "../Hooks/useParamFilter";

interface Props<T> {
    column: string;
    useQuery: (
        params: IParamsApi,
        dependencies: boolean[]
    ) => DefinedUseQueryResult<IResponse<T>, Error>;
    text: string;
    setFilters: (
        filters: {
            column: string;
            value: string | number;
        }[]
    ) => void;
    clearFilters: () => void;
}
function TableDropDownFilter<T>({
    column,
    useQuery,
    text,
    setFilters,
    clearFilters,
}: Props<T>) {
    const [id, setId] = useState(null);
    const { params } = useParamAllData();
    const { data } = useQuery(params, []);

    return (
        <Dropdown
            value={data.items.find((item: any) => item[column] === id) || null}
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
            options={data.items}
            optionLabel={text}
            placeholder="Seleccione una opción..."
            filter
            emptyMessage="No hay registros"
            showClear
            className="w-full"
        />
    );
}

export default TableDropDownFilter;
