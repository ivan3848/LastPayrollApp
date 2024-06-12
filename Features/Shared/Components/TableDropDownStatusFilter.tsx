import { useStatusByTableNameQuery } from "@/Features/status/Hooks/useStatusQuery";
import { IStatus } from "@/Features/status/Types/IStatus";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useState } from "react";

interface Props<T> {
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
    setFilters,
    clearFilters,
    tableName,
}: Props<T>) {
    const [id, setId] = useState(null);
    const { data } = useStatusByTableNameQuery(tableName, []);

    return (
        <Dropdown
            value={data.find((item: IStatus) => item.idStatus === id) || null}
            onChange={(event: DropdownChangeEvent) => {
                if (event.value) {
                    setId(event.value.idStatus);
                    setFilters([
                        { column: "idStatus", value: event.value.idStatus },
                    ]);
                    return;
                }
                setId(null);
                clearFilters();
            }}
            options={data}
            optionLabel="description"
            emptyMessage="No hay registros"
            placeholder="Seleccione una opción..."
            filter
            showClear
            className="w-full"
        />
    );
}

export default TableDropDownStatusFilter;
