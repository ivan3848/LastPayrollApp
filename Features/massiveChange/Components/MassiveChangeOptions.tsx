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
                        icon="pi pi-money-bill"
                        className="m-2"
                        onClick={() =>
                            setAction(MassiveChangeOptionsEnum.MassiveIncrease)
                        }
                    />
                </Link>
                <Link href="/massiveChange/archiveCommission">
                    <Button
                        label="Comision archivo"
                        icon="pi pi-wallet"
                        className="m-2"
                        onClick={() =>
                            setAction(
                                MassiveChangeOptionsEnum.ArchiveCommission
                            )
                        }
                    />
                </Link>
                <Link href="/massiveChange/extraHourLatenessFile">
                    <Button
                        label="Horas Extras"
                        icon="pi pi-stopwatch"
                        className="m-2"
                        onClick={() =>
                            setAction(
                                MassiveChangeOptionsEnum.ExtraHourLatenessFile
                            )
                        }
                    />
                </Link>
                <Link href="/massiveChange/complementaryData">
                    <Button
                        label="Data complementaria"
                        icon="pi pi-pencil"
                        className="m-2"
                        onClick={() =>
                            setAction(
                                MassiveChangeOptionsEnum.ComplementaryData
                            )
                        }
                    />
                </Link>
                <Link href="/massiveChange/massiveEmployee">
                    <Button
                        label="Empleados"
                        icon="pi pi-users"
                        className="m-2"
                        onClick={() =>
                            setAction(
                                MassiveChangeOptionsEnum.ComplementaryData
                            )
                        }
                    />
                </Link>
            </Fieldset>
        </div>
    );
};

export default MassiveChangeOptions;
