import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { DefinedUseQueryResult } from "@tanstack/react-query";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useParamAllData } from "../Hooks/useParamFilter";

interface Props<T> {
    isValid: boolean;
    text: string;
    id: string;
    idValueEdit?: number;
    code: string;
    setValue: UseFormSetValue<any>;
    watch: (field: string) => any;
    useQuery: (
        statusCode: string,
        dependencies: boolean[]
    ) => DefinedUseQueryResult<T[], Error>;
}

function GenericConceptDropDown<T>({
    isValid,
    text,
    id,
    idValueEdit,
    code,
    setValue,
    watch,
    useQuery,
}: Props<T>) {
    useEffect(() => {
        if (idValueEdit) {
            setValue(id, idValueEdit);
        }
    }, [id, idValueEdit, setValue]);

    const { data } = useQuery(code, []);

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

export default GenericConceptDropDown;
