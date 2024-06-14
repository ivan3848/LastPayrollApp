import { classNames } from "primereact/utils";
import React from "react";

interface Props {
    isChecked: boolean;
}

function GenericTableCheck({ isChecked }: Props) {
    return (
        <>
            <i
                className={classNames("pi text-xl ", {
                    "text-green-500 pi-check-circle": isChecked,
                    "text-pink-500 pi-times-circle": !isChecked,
                })}
            ></i>
        </>
    );
}

export default GenericTableCheck;
