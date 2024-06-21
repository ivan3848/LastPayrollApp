import { useStatusByTableNameQuery } from "@/Features/status/Hooks/useStatusQuery";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";

interface Props<T> {
    isValid: boolean;
    id: string;
    idValueEdit?: number;
    tableName: string;
    isFocus?: boolean;
    setValue: UseFormSetValue<any>;
    watch: (field: string) => any;
}

function GenericStatusDropDown<T>({
    isValid,
    id,
    idValueEdit,
    tableName,
    isFocus = false,
    setValue,
    watch,
}: Props<T>) {
    useEffect(() => {
        if (idValueEdit) {
            setValue(id, idValueEdit);
        }
    }, [id, idValueEdit, setValue]);

    const { data } = useStatusByTableNameQuery(tableName, []);

    return (
        <>
            <Dropdown
                value={data.find(
                    (item: any) => item.idStatus === (watch(id) ?? idValueEdit)
                )}
                onChange={(e: DropdownChangeEvent) =>
                    setValue(id, e.value.idStatus)
                }
                options={data}
                optionLabel="description"
                placeholder="Seleccione una opción..."
                filter
                autoFocus={isFocus}
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

export default GenericStatusDropDown;
