import { Checkbox } from "primereact/checkbox";
import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import React, { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";

interface Props {
    id: string;
    text: string;
    currentValue?: boolean;
    setValue: UseFormSetValue<any>;
    watch: (field: string) => any;
}

const GenericCheckBox = ({
    id,
    text,
    currentValue,
    setValue,
    watch,
}: Props) => {
    useEffect(() => {
        if (currentValue) {
            setValue(id, currentValue);
        }
    }, [id, currentValue, setValue]);

    return (
        <div className="field-checkbox">
            <Checkbox
                inputId={id}
                name={id}
                value={id}
                checked={watch(id)}
                onChange={(e) => setValue(id, e.checked!)}
            />
            <label htmlFor={id}>{text}</label>
        </div>
    );
};

export default GenericCheckBox;
