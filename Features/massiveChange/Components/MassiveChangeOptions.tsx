import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import React from "react";
import { MassiveChangeOptionsEnum } from "../Enums/MassiveChangeOptionsEnum";
import Link from "next/link";

interface Props {
    setAction: (action: MassiveChangeOptionsEnum) => void;
    onSubmit?: () => void;
}

const MassiveChangeOptions = ({ setAction }: Props) => {
    return (
        <div>
            <Fieldset legend="Funciones" toggleable className="mb-5">
                <Link href="/massiveChange/massiveIncrease">
                    <Button
                        label="Aumento Masivo"
                        icon="pi pi-search"
                        className="m-2"
                        onClick={() =>
                            setAction(MassiveChangeOptionsEnum.MassiveIncrease)
                        }
                    />
                </Link>
            </Fieldset>
        </div>
    );
};

export default MassiveChangeOptions;
