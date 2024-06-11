import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import React, { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { isValid } from "zod";

interface Props<T> {
    data: T[];
    isValid: boolean;
    text: string;
    id: string;
    setValue: UseFormSetValue<any>;
    watch: (field: string) => any;
    idValueEdit?: number;
}

function GenericDropDown<T>({
    isValid,
    text,
    data,
    id,
    idValueEdit,
    setValue,
    watch,
}: Props<T>) {
    useEffect(() => {
        if (idValueEdit) {
            setValue(id, idValueEdit);
        }
    }, [id, idValueEdit, setValue]);

    return (
        <>
            <Dropdown
                value={data.find(
                    (item: any) => item[id] === (watch(id) ?? idValueEdit)
                )}
                onChange={(e: DropdownChangeEvent) => setValue(id, e.value[id])}
                options={data}
                optionLabel={text}
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

export default GenericDropDown;
