"use client";
import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import Link from "next/link";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useState } from "react";
import ExcelTable from "../../ExcelTable";
import useAddComplementaryDataQuery from "../Hooks/useAddComplementaryDataQuery";
import {
    complementaryDataSchema,
    IComplementaryData,
} from "../Types/IComplementaryData";
import ComplementaryDataTable from "./ComplementaryDataTable";

const ComplementaryData = () => {
    const [isToSendFile, setIsToSendFile] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [complementaryDataSchemaValue, setComplementaryDataSchema] = useState<
        string[]
    >(Object.keys(complementaryDataSchema));
    const {
        setDeleteEntityDialog,
        setAddEntityDialog,
        setSubmitted,
        toast,
        entity,
        deleteEntityDialog,
        submitted,
        setEntity,
    } = useCrudModals<IComplementaryData>();

    const [notExistedEmployeeData, setNotExistedEmployeeData] = useState<
        IComplementaryData[]
    >([]);
    const [isExistEmployee, setIsExistEmployee] = useState(false);

    const handleRevert = (entity: IComplementaryData) => {
        setEntity(entity);
        setSubmitted(false);
        setDeleteEntityDialog(true);
    };

    const addEntity = useAddComplementaryDataQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        setNotExistedEmployeeData,
        setIsExistEmployee,
    });
    const handleUpload = (
        data: any[],
        description: string,
        date: string,
        clear: () => void
    ) => {
        const complementaryData = {
            description: `${description} - ${date}`,
            dateExecuted: date,
            isPaid: false,

            complementaryData: data.map((item) => {
                return {
                    idEmployee: item.idemployee,
                    amount: item.amount,
                    start: item.dateexecuted,
                    conceptCode: String(item.conceptcode),
                };
            }),
        } as IComplementaryData;
        addEntity.mutate(complementaryData);
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
                            setNotExistedEmployeeData([]);
                        }}
                    >
                        <i className="cursor-pointer pi pi-arrow-left"></i>
                    </Link>

                    <h2 className="font-bold white-space-nowrap text-2xl">
                        Data complementaria
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
                                setNotExistedEmployeeData([]);
                            }}
                        >
                            <i className="cursor-pointer pi pi-arrow-left"></i>
                        </Link>

                        <h2 className="font-bold white-space-nowrap text-2xl">
                            Data complementaria
                        </h2>
                    </div>
                </>
            )}
            {isToSendFile ? (
                <ExcelTable
                    handleUpload={handleUpload}
                    type={complementaryDataSchemaValue}
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
                            setComplementaryDataSchema(
                                complementaryDataSchemaValue
                            );
                        }}
                    />
                    <div className="m-2">
                        <ComplementaryDataTable
                            submitted={submitted}
                            handleRevert={handleRevert}
                        />
                    </div>
                    {deleteEntityDialog && (
                        <DeleteEntity
                            id={entity?.idComplementaryData ?? 0}
                            endpoint="employee/complementaryData"
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

export default ComplementaryData;
