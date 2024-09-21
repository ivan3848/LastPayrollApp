import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useParamAllData } from "../Hooks/useParamFilter";
import { classNames } from "primereact/utils";
import { useEffect } from "react";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { DefinedUseQueryResult } from "@tanstack/react-query";
import { UseFormSetValue } from "react-hook-form";

interface Props<T> {
    isValid: boolean;
    text: string;
    id: string;
    idValueEdit?: number;
    idToSet?: string;
    isDisabled?: boolean;
    param?: IParamsApi;
    setValue: UseFormSetValue<any>;
    watch: (field: string) => any;
    onChange?: (e: DropdownChangeEvent) => void;
    useQuery: (
        params: IParamsApi,
        dependencies: boolean[]
    ) => DefinedUseQueryResult<IResponse<T>, Error>;
    placeholder?: string;
}
function GenericDropDown<T>({
    isValid,
    text,
    id,
    idValueEdit,
    isDisabled,
    param,
    idToSet = id,
    placeholder,
    setValue,
    watch,
    useQuery,
    onChange,
}: Props<T>) {
    useEffect(() => {
        if (idValueEdit) {
            setValue(id, idValueEdit);
        }
    }, [id, idValueEdit, setValue]);

    const { params } = useParamAllData();
    const { data } = useQuery(param ?? params, []);

    return (
        <>
            <Dropdown
                showClear
                value={
                    data.items.find(
                        (item: any) =>
                            item[id] === (watch(idToSet) ?? idValueEdit)
                    ) || null
                }
                onChange={(e: DropdownChangeEvent) => {
                    setValue(idToSet, e.value ? e.value[id] : null);
                    onChange && onChange(e);
                }}
                options={data.items}
                optionLabel={text}
                placeholder={placeholder ?? "Seleccione una opción..."}
                filter
                emptyMessage="No hay registros"
                className={classNames(
                    {
                        "p-invalid": isValid,
                    },
                    "w-full"
                )}
                disabled={isDisabled}
            />
        </>
    );
}

export default GenericDropDown;
