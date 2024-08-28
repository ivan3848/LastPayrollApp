"use client";
import ExcelTable from "@/Features/massiveChange/Components/ExcelTable";
import Link from "next/link";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import React, { useState } from "react";
import {
    commissionArchiveSchema,
    ICommissionArchive,
} from "../Types/ICommission";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import CommissionArchiveTable from "./CommissionArchiveTable";
import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import useAddCommissionDetailArchiveQuery from "../../CommissionDetail/Hooks/useAddCommissionDetailArchiveQuery";
import {
    ICommissionDetail,
    ICommissionDetailArchive,
} from "../Types/ICommissionDetail";
import { number } from "zod";

const CommissionArchive = () => {
    const [isToSendFile, setIsToSendFile] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [notExistedEmployeeData, setNotExistedEmployeeData] = useState<
        ICommissionArchive[]
    >([]);
    const [isExistEmployee, setIsExistEmployee] = useState(false);

    const [commissionArchiveSchemaValue, setCommissionArchiveSchema] = useState<
        string[]
    >(Object.keys(commissionArchiveSchema));

    const {
        setDeleteEntityDialog,
        setAddEntityDialog,
        setSubmitted,
        toast,
        entity,
        deleteEntityDialog,
        submitted,
        setEntity,
    } = useCrudModals<ICommissionArchive>();

    const handleRevert = (entity: ICommissionArchive) => {
        setEntity(entity);
        setSubmitted(false);
        setDeleteEntityDialog(true);
    };

    const addEntity = useAddCommissionDetailArchiveQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
    });

    const handleUpload = (
        data: any[],
        name: string,
        date: string,
        clear: () => void
    ) => {
        const commissionArchive = {
            isFromFile: true,
            commissionDetail: data,
            payDate: new Date(date),
            dateExcecuted: new Date(),
            description: name,
        } as ICommissionArchive;

        if (
            commissionArchive.commissionDetail.some(
                (x: ICommissionDetailArchive) => isNaN(x.idpayrollpay)
            )
        ) {
            toast.current?.show({
                severity: "warn",
                summary: "Error",
                detail: "El archivo contiene registros con letras en el campo Código de nómina",
                life: 3000,
            });
            return;
        }
        if (
            commissionArchive.commissionDetail.some(
                (x: ICommissionDetailArchive) =>
                    typeof x.conceptcode === "number"
            )
        ) {
            commissionArchive.commissionDetail.forEach(
                (x: ICommissionDetailArchive) => {
                    if (typeof x.conceptcode === "number") {
                        x.conceptcode = x.conceptcode.toString();
                    }
                }
            );
        }
        addEntity.mutate(commissionArchive);
        clear();
    };

    return (
        <>
            <Toast ref={toast} />
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
                        Archivo de Comisiones
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
                            Archivo de Comisiones
                        </h2>
                    </div>
                </>
            )}
            {isToSendFile ? (
                <ExcelTable
                    handleUpload={handleUpload}
                    type={commissionArchiveSchemaValue}
                    notExistedEmployeeData={notExistedEmployeeData}
                    setIsExistEmployee={setIsExistEmployee}
                    isExistEmployee={isExistEmployee}
                    setNotExistedEmployeeData={setNotExistedEmployeeData}
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
                            setCommissionArchiveSchema(
                                commissionArchiveSchemaValue
                            );
                        }}
                    />
                    <div className="m-2">
                        <CommissionArchiveTable
                            submitted={submitted}
                            handleRevert={handleRevert}
                        />
                    </div>
                    {deleteEntityDialog && (
                        <DeleteEntity
                            id={entity?.idCommission ?? 0}
                            endpoint="employee/commission"
                            deleteEntityDialog={deleteEntityDialog}
                            setDeleteEntityDialog={setDeleteEntityDialog}
                            setSubmitted={setSubmitted}
                            toast={toast}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default CommissionArchive;
