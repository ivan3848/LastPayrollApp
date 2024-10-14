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
    isReadOnly?: boolean;
    prefix?: string;
    suffix?: string;
    watch: (field: string) => any;
    setValue: UseFormSetValue<any>;
    fractionValue?: number;
}

const GenericInputNumber = ({
    id,
    currentValue,
    isValid,
    minValue = 0,
    maxValue,
    isFocus = false,
    format = true,
    prefix = "RD$",
    suffix = "",
    fractionValue,
    setValue,
    watch,
    isReadOnly,
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
            disabled={isReadOnly}
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
            minFractionDigits={fractionValue ? fractionValue : 2}
            maxFractionDigits={fractionValue ? 2 : 2}
            prefix={prefix}
            suffix={suffix}
        />
    );
};

export default GenericInputNumber;
