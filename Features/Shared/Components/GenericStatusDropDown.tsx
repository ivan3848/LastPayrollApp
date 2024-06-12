import { useStatusByTableNameQuery } from "@/Features/status/Hooks/useStatusQuery";
import { IStatus } from "@/Features/status/Types/IStatus";
import { DefinedUseQueryResult } from "@tanstack/react-query";
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
    useQuery: (
        code: string,
        dependencies: boolean[]
    ) => DefinedUseQueryResult<T[], Error>;
}

function GenericConceptDropDown<T>({
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
                    (item: IStatus) => item.idStatus === (watch(id) ?? idValueEdit)
                )}
                onChange={(e: DropdownChangeEvent) => setValue(id, e.value.idStatus)}
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

export default GenericConceptDropDown;
