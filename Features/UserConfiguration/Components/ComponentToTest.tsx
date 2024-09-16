import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { DefinedUseQueryResult } from "@tanstack/react-query";
import BasicDemo from "./BasicDemo";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useParamAllData } from "@/Features/Shared/Hooks/useParamFilter";

interface Props<T> {
    isValid: boolean;
    text: string;
    id: string;
    idValueEdit?: number;
    isDisabled?: boolean;
    param?: IParamsApi;
    setValue: UseFormSetValue<any>;
    watch: (field: string) => any;
    useQuery: (
        params: IParamsApi,
        dependencies: boolean[]
    ) => DefinedUseQueryResult<IResponse<T>, Error>;
    placeholder?: string;
}

function ComponentToTest<T>({
    isValid,
    text,
    id,
    idValueEdit,
    isDisabled,
    param,
    setValue,
    watch,
    useQuery,
    placeholder,
}: Props<T>) {
    const { params } = useParamAllData();
    const { data } = useQuery(param ?? params, []);
    const [idTest, setIdTest] = useState<number>(idValueEdit || 0);

    useEffect(() => {
        if (idValueEdit) {
            setValue(id, idValueEdit);
            setIdTest(idValueEdit);
        }
    }, [id, idValueEdit, setValue]);

    const handleDropdownChange = (e: DropdownChangeEvent) => {
        const selectedValue = e.value ? e.value[id] : null;
        setValue(id, selectedValue);
        setIdTest(selectedValue);
    };

    return (
        <>
            <Dropdown
                value={
                    data?.items.find(
                        (item: any) => item[id] === (watch(id) ?? idValueEdit)
                    ) || null
                }
                onChange={handleDropdownChange}
                options={data?.items}
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

            <BasicDemo
                id={"idRol"}
                idValue={idTest}
                setValue={setValue}
                intialData={idValueEdit}
            />
        </>
    );
}

export default ComponentToTest;
