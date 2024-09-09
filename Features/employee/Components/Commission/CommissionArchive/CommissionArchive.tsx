"use client";
import React, { useState } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { SelectButton } from "primereact/selectbutton";
import { InputText } from "primereact/inputtext";
import Link from "next/link";
import ExcelTable from "@/Features/massiveChange/Components/ExcelTable";
import CommissionArchiveTable from "./CommissionArchiveTable";
import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import useAddCommissionDetailArchiveQuery from "../../CommissionDetail/Hooks/useAddCommissionDetailArchiveQuery";
import {
    commissionArchiveSchema,
    ICommissionArchive,
} from "../Types/ICommission";
import { ICommissionDetailArchive } from "../Types/ICommissionDetail";
import { Calendar } from "primereact/calendar";
import commissionFormSchema from "../Validation/commissionFormSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import useCommissionArchiveQuery from "../Hooks/useCommissionArchiveQuery";

const CommissionArchive = () => {
    const [
        isCommissionPayrollDialogVisible,
        setIsCommissionPayrollDialogVisible,
    ] = useState(false);
    const [isCommissionPayroll, setIsCommissionPayroll] = useState(true);
    const [isToSendFile, setIsToSendFile] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [notExistedEmployeeData, setNotExistedEmployeeData] = useState<
        ICommissionArchive[]
    >([]);
    const [isExistEmployee, setIsExistEmployee] = useState(false);
    const [commissionArchiveSchemaValue, setCommissionArchiveSchema] = useState<
        string[]
    >(Object.keys(commissionArchiveSchema));
    const [description, setDescription] = useState("");
    const [payDate, setPayDate] = useState<Date>();
    const [commissionArchive, setCommissionArchive] =
        useState<ICommissionArchive | null>(null);

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

    const { addEntityFormSchemaArchive } = commissionFormSchema();

    const {
        handleSubmit,
        register,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<ICommissionArchive>({
        resolver: zodResolver(addEntityFormSchemaArchive),
    });

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
        const newCommissionArchive = {
            isFromFile: true,
            commissionDetail: data,
            dateExcecuted: payDate,
            documentName: name,
            chargeDate: payDate,
        } as ICommissionArchive;

        if (
            newCommissionArchive.commissionDetail.some(
                (x: ICommissionDetailArchive) =>
                    typeof x.conceptcode === "number"
            )
        ) {
            newCommissionArchive.commissionDetail.forEach(
                (x: ICommissionDetailArchive) => {
                    if (typeof x.conceptcode === "number") {
                        x.conceptcode = x.conceptcode.toString();
                    }
                }
            );
        }
        setDescription(name);
        setCommissionArchive(newCommissionArchive);
        setIsCommissionPayrollDialogVisible(true);

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

            <Dialog
                header="Agregar Comisión por archivo"
                visible={isCommissionPayrollDialogVisible}
                style={{ width: "25%" }}
                footer={
                    <div>
                        <Button
                            label="Cancel"
                            icon="pi pi-times"
                            onClick={() =>
                                setIsCommissionPayrollDialogVisible(false)
                            }
                            className="p-button-text border"
                        />
                        <Button
                            label="Save"
                            icon="pi pi-check"
                            onClick={() => {
                                setIsCommissionPayrollDialogVisible(false);
                                if (commissionArchive) {
                                    commissionArchive.isCommissionPayroll =
                                        isCommissionPayroll;
                                    commissionArchive.description = description;
                                    commissionArchive.payDate = payDate!;
                                    addEntity.mutate(commissionArchive);
                                }
                                setPayDate(new Date());
                                setDescription("");
                            }}
                            autoFocus
                        />
                    </div>
                }
                onHide={() => setIsCommissionPayrollDialogVisible(false)}
            >
                <div className="field col-12 md:col-6 lg:col-4">
                    <label htmlFor="description">Description</label>
                    <InputText
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="field ">
                    <label htmlFor="payDate" className="w-full">
                        Fecha de pago
                    </label>
                    <Calendar
                        id="payDate"
                        onChange={(e) => setPayDate(e.value!)}
                        showIcon
                        showButtonBar
                        required
                        autoFocus
                        value={payDate ?? new Date()}
                    />
                </div>

                {
                    <div className="field">
                        <label htmlFor="idCommission" className="w-full">
                            Comisión
                        </label>
                        <GenericDropDown
                            id="idCommission"
                            text="description"
                            placeholder="Si quiere una comisión nueva, deje el campo vacío."
                            useQuery={useCommissionArchiveQuery}
                            setValue={setValue}
                            watch={watch}
                            isValid={false}
                        />
                        {errors.idCommission && (
                            <small className="p-invalid text-danger">
                                {errors.idCommission.message?.toString()}
                            </small>
                        )}
                    </div>
                }

                <div className="field col-12 ">
                    <label htmlFor="isCommissionPayroll">Por Nomina</label>
                    <div>
                        <SelectButton
                            id="isCommissionPayroll"
                            value={isCommissionPayroll ? "Si" : "No"}
                            options={["Si", "No"]}
                            onChange={(e) =>
                                setIsCommissionPayroll(e.value === "Si")
                            }
                        />
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default CommissionArchive;
