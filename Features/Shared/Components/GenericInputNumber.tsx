import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import React, { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";

interface Props {
    id: string;
    currentValue?: number;
    isValid: boolean;
    minValue?: number;
    maxValue?: number;
    setValue: UseFormSetValue<any>;
    watch: (field: string) => any;
    isFocus?: boolean;
    format?: boolean;
}

const GenericInputNumber = ({
    id,
    currentValue,
    isValid,
    minValue,
    maxValue,
    isFocus = false,
    format = true,
    setValue,
    watch,
}: Props) => {
    useEffect(() => {
        if (currentValue) {
            setValue(id, currentValue);
        }
    }, [id, currentValue, setValue]);

    return (
        <InputNumber
            value={watch(id)}
            onChange={(e) => setValue(id, e.value!)}
            id={id}
            className={classNames({
                "p-invalid": isValid,
            })}
            allowEmpty
            min={minValue}
            max={maxValue}
            showButtons
            autoFocus={isFocus}
            format={format}
            minFractionDigits={2}
            maxFractionDigits={2}
            prefix="RD$"
        />
    );
};

export default GenericInputNumber;
