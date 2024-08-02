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
    isFocus?: boolean;
    format?: boolean;
    prefix?: string;
    suffix?: string;
    disabled?: boolean;
    watch: (field: string) => any;
    setValue: UseFormSetValue<any>;
}

const GenericInputNumber = ({
    id,
    currentValue,
    isValid,
    minValue,
    maxValue,
    isFocus = false,
    format = true,
    prefix = "RD$",
    suffix = "",
    disabled = false,
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
            prefix={prefix}
            suffix={suffix}
            disabled={disabled}
        />
    );
};

export default GenericInputNumber;
