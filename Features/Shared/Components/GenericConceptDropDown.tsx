import { useConceptByStatusCodeQuery } from "@/Features/concept/Hooks/useConceptQuery";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";

interface Props<T> {
    isValid: boolean;
    id: string;
    idValueEdit?: number;
    code: string;
    setValue: UseFormSetValue<any>;
    watch: (field: string) => any;
    setData?: (data: any) => void;
}

function GenericConceptDropDown<T>({
    isValid,
    id,
    idValueEdit,
    code,
    setValue,
    watch,
    setData,
}: Props<T>) {
    useEffect(() => {
        if (idValueEdit) {
            setValue(id, idValueEdit);
        }
    }, [id, idValueEdit, setValue]);

    const { data } = useConceptByStatusCodeQuery(code, []);

    return (
        <>
            <Dropdown
                value={data.find(
                    (item: any) => item[id] === (watch(id) ?? idValueEdit)
                )}
                onChange={(e: DropdownChangeEvent) => {
                    setData && setData(e.value);
                    setValue(id, e.value.idConcept)
                }}
                options={data}
                optionLabel="name"
                placeholder="Seleccione una opción..."
                filter
                emptyMessage="No hay registros"
                className={classNames(
                    {
                        "p-invalid": isValid,
                    },
                    "w-full"
                )}
            />
        </>
    );
}

export default GenericConceptDropDown;
