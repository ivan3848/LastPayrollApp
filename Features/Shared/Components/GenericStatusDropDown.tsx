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
    isReadOnly?: boolean;
    setValue: UseFormSetValue<any>;
    watch: (field: string) => any;
    onClick?: (e: any) => void;
}

function GenericStatusDropDown<T>({
    isValid,
    id,
    idValueEdit,
    tableName,
    isFocus = false,
    setValue,
    watch,
    onClick,
    isReadOnly = false,
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
                onClick={(e) => onClick && onClick(e.target)}
                optionLabel="description"
                placeholder="Seleccione una opción..."
                disabled={isReadOnly}
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
