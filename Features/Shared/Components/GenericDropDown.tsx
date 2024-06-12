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
    setValue: UseFormSetValue<any>;
    watch: (field: string) => any;
    useQuery: (
        params: IParamsApi,
        dependencies: boolean[]
    ) => DefinedUseQueryResult<IResponse<T>, Error>;
}

function GenericDropDown<T>({
    isValid,
    text,
    id,
    idValueEdit,
    setValue,
    watch,
    useQuery,
}: Props<T>) {
    useEffect(() => {
        if (idValueEdit) {
            setValue(id, idValueEdit);
        }
    }, [id, idValueEdit, setValue]);

    const { params } = useParamAllData();
    const { data } = useQuery(params, []);

    return (
        <>
            <Dropdown
                value={data.items.find(
                    (item: any) => item[id] === (watch(id) ?? idValueEdit)
                )}
                onChange={(e: DropdownChangeEvent) => setValue(id, e.value[id])}
                options={data.items}
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
