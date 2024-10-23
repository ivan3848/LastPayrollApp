import React, { useState } from "react";
import { IEmployee } from "../../../Types/IEmployee";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { useForm } from "react-hook-form";
import { InputSwitch } from "primereact/inputswitch";
import FiredEmployeeFormSchema from "../Validation/FiredEmployeeFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import firedEmployeeService from "../Services/firedEmployee";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import useFiredEmployeeEntityQuery from "../Hooks/useFiredEmployeeEntityQuery";
import Link from "next/link";
import { ProgressSpinner } from "primereact/progressspinner";
import { IFireEmployee, IFireEmployeeResponse } from "../Types/IFiredEmployee";
import { IGetFiredEmployeePreviewInformation } from "../Types/IGetFiredEmployeePreviewInformation";
import { createRoot } from "react-dom/client";
import FiredEmployeeInvoiceViewer from "@/Features/reports/components/FiredEmployeeInvoiceViewer";
import FiredEmployeePreviewInvoiceViewer from "@/Features/reports/components/FiredEmployeePreviewInvoiceViewer";
import { IGetFiredEmployee } from "../Types/IGetFiredEmployee";

interface Props {
    employee: IEmployee;
    setCloseDialog: (value: boolean) => void;
}

const style: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
    zIndex: 9999,
};

const FireEmployee = ({ employee, setCloseDialog }: Props) => {
    const { setSubmitted, toast } = useCrudModals<IFireEmployee>();

    const [pagoNavidad, setPagoNavidad] = useState(false);
    const [notice, setNotice] = useState(false);
    const [vacation, setVacation] = useState(false);
    const [unemployment, setUnemployment] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [loading, setLoading] = useState(false);

    const addEntitySchema = FiredEmployeeFormSchema();

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IFireEmployee>({
        resolver: zodResolver(addEntitySchema),
    });

    const addEntity = useFiredEmployeeEntityQuery({
        toast,
        setSubmitted,
        reset,
        service: firedEmployeeService,
        message: "Empleado desvinculado correctamente",
    });

    const executeReport = (data: IGetFiredEmployeePreviewInformation[]) => {
        if (data?.length) {
            const newTab = window.open("", "_blank");
            if (newTab) {
                newTab.document.write(
                    '<div id="fired-employee-preview-invoice-viewer-root"></div>'
                );
                newTab.document.close();

                const rootElement = newTab.document.getElementById(
                    "fired-employee-preview-invoice-viewer-root"
                );
                if (rootElement) {
                    const root = createRoot(rootElement);
                    root.render(
                        <FiredEmployeePreviewInvoiceViewer data={data} />
                    );
                }
            }
        }
    };

    const executeReportAfterInsert = async (data: IGetFiredEmployee[]) => {
        if (data?.length) {
            const newTab = window.open("", "_blank");
            if (newTab) {
                newTab.document.write(
                    '<div id="fired-employee-invoice-viewer-root"></div>'
                );
                newTab.document.close();

                const rootElement = newTab.document.getElementById(
                    "fired-employee-invoice-viewer-root"
                );
                if (rootElement) {
                    const root = createRoot(rootElement);
                    root.render(<FiredEmployeeInvoiceViewer data={data} />);
                }
            }
        }
    };

    const onPreview = (previewData: IFireEmployee) => {
        firedEmployeeService
            .post(previewData)
            .then((res: string | IFireEmployeeResponse) => {
                if (typeof res !== "string") {
                    executeReport(res.getFiredEmployeePreviewInformation);
                }
            });
    };

    const onFormSubmit = async (data: IFireEmployee) => {
        data.idEmployee = employee.idEmployee;
        data.isChristmasPayment = pagoNavidad;
        data.isNotice = notice;
        data.isTakeVacation = vacation;
        data.isUnemployment = unemployment;
        data.firedDate = data.firedDate ?? new Date();
        data.idStatusFired = data.idStatusFired;
        data.isPreview = isPreview;

        setLoading(true);

        if (isPreview) {
            onPreview(data);
            setLoading(false);
            return;
        }

        const test = await addEntity.mutateAsync(data, {
            onSuccess: (res: string | IFireEmployeeResponse) => {
                if (typeof res !== "string") {
                    executeReportAfterInsert(res.getFiredEmployee);
                }
                setLoading(false);
            },
            onError: () => {
                setLoading(false);
            },
        });

        if (!test.toString().includes("Hay")) {
            console.log("No hay errores");
            setCompleted(true);
        }
    };

    const hideDialog = () => {
        setCloseDialog(false);
    };

    return (
        <div className="grid">
            <div className="col-12 mx-auto">
                <div className="card">
                    <Toast ref={toast} />
                    {loading && (
                        <div style={style}>
                            <ProgressSpinner aria-label="Ejecutando proceso de Nómina..." />
                        </div>
                    )}
                    {completed && (
                        <div style={style}>
                            <div className="card flex flex-column gap-3 align-items-center">
                                <div className="card">
                                    <h5 className="my-2">
                                        Empleado desvinculado correctamente!
                                        <i
                                            className="pi pi-check-circle ml-2"
                                            style={{
                                                fontSize: "1.3rem",
                                                marginTop: "0.2rem",
                                            }}
                                        />
                                    </h5>
                                </div>
                                <div className="flex gap-3">
                                    <Link href="/employee">
                                        <Button
                                            onClick={() => {
                                                setCompleted(false);
                                            }}
                                            icon="pi pi-times"
                                            label="Cerrar"
                                            className="p-button-danger"
                                        />
                                    </Link>
                                    <Link href="/">
                                        <Button
                                            icon="pi pi-list"
                                            label="Ver detalles"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <div
                            className="p-fluid formgrid grid"
                            style={{
                                marginTop: "15px",
                                display: "flex",
                                justifyContent: "space-evenly",
                                width: "100%",
                            }}
                        >
                            <div className="field col-12 md:col-3">
                                <label
                                    htmlFor="idStatusFired"
                                    className="w-full"
                                >
                                    Medida
                                </label>
                                <GenericStatusDropDown
                                    id="idStatusFired"
                                    isValid={!!errors.idStatusFired}
                                    setValue={setValue}
                                    watch={watch}
                                    isFocus={true}
                                    tableName="CancelationTypeStatus"
                                />
                                {errors.idStatusFired && (
                                    <small className="p-invalid text-danger">
                                        {errors.idStatusFired.message?.toString()}
                                    </small>
                                )}
                            </div>
                            <div className="field col-12 md:col-3">
                                <label htmlFor="idStatus" className="w-full">
                                    Motivo
                                </label>
                                <GenericStatusDropDown
                                    id="idCancelationType"
                                    isValid={!!errors.idCancelationType}
                                    setValue={setValue}
                                    watch={watch}
                                    isFocus={true}
                                    tableName="CancelationReasonStatus"
                                />
                                {errors.idCancelationType && (
                                    <small className="p-invalid text-danger">
                                        {errors.idCancelationType.message?.toString()}
                                    </small>
                                )}
                            </div>
                            <div className="field col-12 md:col-3">
                                <label id="firedDate" htmlFor="firedDate">
                                    Fecha de inicio
                                </label>
                                <Calendar
                                    {...register("firedDate")}
                                    id="firedDate"
                                    name="firedDate"
                                    value={watch("firedDate") ?? new Date()}
                                    onChange={(e) =>
                                        setValue("firedDate", e.value!)
                                    }
                                    showIcon
                                />
                            </div>
                        </div>
                        <div
                            className="p-fluid formgrid grid"
                            style={{
                                marginTop: "15px",
                                marginBottom: "15px",
                                display: "flex",
                                justifyContent: "space-evenly",
                                width: "100%",
                            }}
                        >
                            <div className="field col-12 md:col-3">
                                <h6>Pago de Navidad</h6>
                                <InputSwitch
                                    {...register("isChristmasPayment")}
                                    id="isChristmasPayment"
                                    name="isChristmasPayment"
                                    checked={pagoNavidad}
                                    onChange={(e) => setPagoNavidad(e.value)}
                                />
                                <h6>Pre-Aviso</h6>
                                <InputSwitch
                                    {...register("isNotice")}
                                    name="isNotice"
                                    checked={notice}
                                    onChange={(e) => setNotice(e.value)}
                                />
                            </div>
                            <div className="field col-12 md:col-3">
                                <h6>Ha tomado vacaciones este año?</h6>
                                <InputSwitch
                                    {...register("isTakeVacation")}
                                    id="isTakenVacation"
                                    name="isTakenVacation"
                                    checked={vacation}
                                    onChange={(e) =>
                                        setVacation(e.value ?? false)
                                    }
                                />
                                <h6>Cesantia</h6>
                                <InputSwitch
                                    {...register("isUnemployment")}
                                    id="isUnemployment"
                                    name="isUnemployment"
                                    checked={unemployment}
                                    onChange={(e) =>
                                        setUnemployment(e.value ?? false)
                                    }
                                />
                            </div>
                            <div className="field col-12 md:col-3">
                                <label htmlFor="comment">Descripción</label>
                                <InputTextarea
                                    {...register("comment")}
                                    id="comment"
                                    placeholder="Ingrese descripción..."
                                    rows={3}
                                    cols={30}
                                />
                            </div>
                        </div>
                        <Divider align="center"></Divider>
                        <div
                            className="flex justify-content-end mt-3"
                            style={{
                                width: "auto",
                                gap: "6px",
                                marginLeft: "auto",
                            }}
                        >
                            <Button
                                label="Previsualizar"
                                severity="info"
                                icon="pi pi-eye"
                                onClick={() => setIsPreview(true)}
                                type="submit"
                                disabled={!employee.isActive}
                                raised
                            />
                            <Button
                                label="Cancelar"
                                icon="pi pi-undo"
                                raised
                                type="button"
                                onClick={hideDialog}
                                severity="danger"
                            />
                            <Button
                                label="Desvincular"
                                disabled={!employee.isActive}
                                icon="pi pi-ban"
                                raised
                                type="submit"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FireEmployee;
