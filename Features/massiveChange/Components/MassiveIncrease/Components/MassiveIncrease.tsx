import React, { useState } from "react";
import Link from "next/link";
import { Button } from "primereact/button";
import ExcelTable from "../../ExcelTable";
import MassiveIncreaseTable from "./MassiveIncreaseTable";
import {
    IMassiveIncrease,
    massiveIncreaseSchema,
} from "../Types/IMassiveIncrease";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import massiveIncreaseService from "../Services/massiveIncreaseService";
import useAddMassiveIncreaseQuery from "../Hooks/useAddMassiveIncreaseQuery";

const MassiveIncrease = () => {
    const [isToSendFile, setIsToSendFile] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [massiveIncreaseSchemaValue, setMassiveIncreaseSchema] = useState<
        string[]
    >(Object.keys(massiveIncreaseSchema));
    const { setDeleteEntityDialog, setAddEntityDialog, setSubmitted, toast } =
        useCrudModals<IMassiveIncrease>();

    const handleDelete = () => {
        setSubmitted(false);
        setDeleteEntityDialog(true);
    };

    const addEntity = useAddMassiveIncreaseQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
    });

    const handleUpload = () => {
        const data = {
            name: "PEPE",
            chargeDate: "2021-09-09",
            employees: [
                {
                    idEmployee: 2,
                    salary: 25000,
                    dateChange: "2021-09-09",
                    reason: "Queria un aumento 2",
                },
                {
                    idEmployee: 1,
                    salary: 35000,
                    dateChange: "2021-09-09",
                    reason: "Queria un aumento 2",
                },
                {
                    idEmployee: 4313,
                    salary: 50000,
                    dateChange: "2021-09-09",
                    reason: "Queria un aumento 2",
                },
            ],
            isPaid: false,
            idPayrollPay: undefined,
        } as IMassiveIncrease;

        console.log(data);
        addEntity.mutate(data);
    };

    return (
        <>
            {isVisible ? (
                <div className="inline-flex align-items-center justify-content-center gap-5">
                    <Link
                        href="/massiveChange"
                        className="text-inherit"
                        style={{ textDecoration: "none", color: "inherit" }}
                        onClick={() => {
                            setIsToSendFile(false);
                            setIsVisible(false);
                        }}
                    >
                        <i className="cursor-pointer pi pi-arrow-left"></i>
                    </Link>

                    <h2 className="font-bold white-space-nowrap text-2xl">
                        Aumento Masivo
                    </h2>
                </div>
            ) : (
                <>
                    <div className="inline-flex align-items-center justify-content-center gap-5">
                        <Link
                            href=""
                            className="text-inherit"
                            style={{ textDecoration: "none", color: "inherit" }}
                            onClick={() => {
                                setIsToSendFile(false);
                                setIsVisible(true);
                            }}
                        >
                            <i className="cursor-pointer pi pi-arrow-left"></i>
                        </Link>

                        <h2 className="font-bold white-space-nowrap text-2xl">
                            Aumento Masivo
                        </h2>
                    </div>
                </>
            )}
            {isToSendFile ? (
                <ExcelTable
                    handleUpload={handleUpload}
                    type={massiveIncreaseSchemaValue}
                />
            ) : (
                <div className="m-2">
                    <Button
                        icon="pi pi-fw pi-upload"
                        className="p-button p-button-rounded p-button-outlined"
                        label="Subir Archivo"
                        onClick={() => {
                            setIsToSendFile(true);
                            setIsVisible(false);
                            setMassiveIncreaseSchema(
                                massiveIncreaseSchemaValue
                            );
                        }}
                    />
                    <div className="m-2">
                        <MassiveIncreaseTable
                            submitted={false}
                            handleDelete={handleDelete}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default MassiveIncrease;
