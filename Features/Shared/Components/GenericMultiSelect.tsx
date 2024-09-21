import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { DefinedUseQueryResult } from "@tanstack/react-query";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import React, { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useParamAllData } from "../Hooks/useParamFilter";

interface Props<T> {
    idValueEdit?: number;
    id: string;
    param?: IParamsApi;
    onChange?: (e: any) => void;
    setValue?: UseFormSetValue<any>;
    useQuery: (
        params: IParamsApi,
        dependencies: boolean[]
    ) => DefinedUseQueryResult<IResponse<T>, Error>;
    placeholder?: string;
    idToSet?: string;
    optionLabel?: string;
    alterFetchName?: string;
}
function GenericMultiSelect<T>({
    id,
    param,
    placeholder,
    useQuery,
    optionLabel,
    onChange,
    alterFetchName,
}: Props<T>) {
    const { params } = useParamAllData();
    const { data } = useQuery(param ?? params, []);
    const [selectedObject, setSelectedObject] = useState<T[] | null>(null);

    const handleMultiSelectChange = (e: MultiSelectChangeEvent) => {
        setSelectedObject(e.value);
        if (onChange) {
            e.value = e.value.map(
                (item: any) => item[alterFetchName ?? (optionLabel as string)]
            );
            onChange(e.value);
        }
    };

    return (
        <MultiSelect
            id={id}
            value={selectedObject}
            onChange={handleMultiSelectChange}
            options={data.items}
            optionLabel={optionLabel}
            placeholder={placeholder}
            maxSelectedLabels={3}
            filter
            selectedItemsLabel={"{0} posiciones seleccionadas"}
            className="w-full md:w-20rem"
        />
    );
}

export default GenericMultiSelect;
