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
    isDisabled?: boolean;
    param?: IParamsApi;
    onChange?: (e: DropdownChangeEvent) => void;
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
    isDisabled,
    param,
    onChange,
}: Props<T>) {
    useEffect(() => {
        if (idValueEdit) {
            setValue(id, idValueEdit);
        }
    }, [id, idValueEdit, setValue]);

    let { params } = useParamAllData();
    const { data } = useQuery(param ?? params, []);

    return (
        <>
            <Dropdown
                value={data.items.find(
                    (item: any) => item[id] === (watch(id) ?? idValueEdit)
                )}
                onChange={(e: DropdownChangeEvent) => {
                    setValue(id, e.value[id]);
                    onChange && onChange(e);
                }}
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
                disabled={isDisabled}
            />
        </>
    );
}

export default GenericDropDown;
