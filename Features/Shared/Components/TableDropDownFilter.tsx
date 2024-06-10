import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useState } from "react";

interface Props<T> {
    column: string;
    data: T[];
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
    data,
    text,
    setFilters,
    clearFilters,
}: Props<T>) {
    const [id, setId] = useState(null);
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

export default TableDropDownFilter;
