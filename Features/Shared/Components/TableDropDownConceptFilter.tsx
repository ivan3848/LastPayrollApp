import { DefinedUseQueryResult } from "@tanstack/react-query";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useState } from "react";
import { useParamAllData } from "../Hooks/useParamFilter";

interface Props<T> {
    column: string;
    useQuery: (
        statusCode: string,
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
    code: string;
}
function TableDropDownConceptFilter<T>({
    column,
    useQuery,
    text,
    setFilters,
    clearFilters,
    code
}: Props<T>) {
    const [id, setId] = useState(null);
    const {params} = useParamAllData();
    const { data } = useQuery(code, []);

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

export default TableDropDownConceptFilter;
