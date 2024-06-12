import { useConceptByStatusCodeQuery } from "@/Features/concept/Hooks/useConceptQuery";
import { IConcept } from "@/Features/concept/Types/IConcept";
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
    code: string;
}
function TableDropDownConceptFilter<T>({
    setFilters,
    clearFilters,
    code,
}: Props<T>) {
    const [id, setId] = useState(null);
    const { data } = useConceptByStatusCodeQuery(code, []);

    return (
        <Dropdown
            value={data.find((item: IConcept) => item.idConcept === id) || null}
            onChange={(event: DropdownChangeEvent) => {
                if (event.value) {
                    setId(event.value.idConcept);
                    setFilters([
                        { column: "idConcept", value: event.value.idConcept },
                    ]);
                    return;
                }
                setId(null);
                clearFilters();
            }}
            options={data}
            optionLabel="name"
            emptyMessage="No hay registros"
            placeholder="Seleccione una opción..."
            filter
            showClear
            className="w-full"
        />
    );
}

export default TableDropDownConceptFilter;
