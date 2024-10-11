import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { useEffect } from "react";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { DefinedUseQueryResult } from "@tanstack/react-query";
import { UseFormSetValue } from "react-hook-form";
import React from "react";
import { useParamAllData } from "@/Features/Shared/Hooks/useParamFilter";

interface Props<T> {
    isValid: boolean;
    text: string;
    id: string;
    idValueEdit?: number;
    idToSet: string;
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

function GenericDropDownConfiguration<T>({
    isValid,
    text,
    idValueEdit,
    isDisabled,
    param,
    id,
    idToSet,
    placeholder,
    setValue,
    watch,
    useQuery,
    onChange,
}: Props<T>) {
    useEffect(() => {
        if (idValueEdit) {
            setValue(idToSet, idValueEdit);
        }
    }, [idValueEdit, setValue, idToSet]);

    const { params } = useParamAllData();
    const { data, isLoading, error } = useQuery(param ?? params, []);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading options</p>;

    return (
        <Dropdown
            showClear
            value={
                data?.items.find(
                    (item: any) =>
                        item["idConcept"] === (watch(idToSet) ?? idValueEdit)
                ) || null
            }
            onChange={(e: DropdownChangeEvent) => {
                setValue(idToSet, e.value ? e.value["idConcept"] : null);
                onChange && onChange(e);
            }}
            options={data?.items || []}
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
            aria-label={text}
        />
    );
}

export default GenericDropDownConfiguration;
