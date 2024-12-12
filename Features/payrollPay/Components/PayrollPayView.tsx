"use client";
import usePayrollAreaQuery from "@/Features/payrollArea/Hooks/usePayrollAreaQuery";
import {
    lastPayrollManagementService,
    payrollManagementByPayrollNumberService,
} from "@/Features/payrollManagement/payrollManagementService";
import InvoiceViewer from "@/Features/reports/components/InvoiceViewer";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import Link from "next/link";
import { Button } from "primereact/button";
import { ConfirmPopup } from "primereact/confirmpopup";
import { InputNumber } from "primereact/inputnumber";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { SelectButton } from "primereact/selectbutton";
import { TabPanel, TabView } from "primereact/tabview";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { useForm } from "react-hook-form";
import { generatePayrollPayService } from "../Services/payrollPayService";
import {
    IGetPayrollExecution,
    IGetPayrollExecutionTest,
} from "../types/IGetPayrollExecution";
import { IPayrollPay } from "../types/IPayrollPay";
import AddOrExcludeEmployee, { IAddEmployee } from "./AddOrExcludeEmployee";
import DeletePayrollDialog from "./DeletePayrollDialog";
import DialogFooterButtonPayrollPay from "./DialogFooterButtonPayrollPay";
import GenerateFiles from "./GenerateFiles";
import GenerateReceiptDialog from "./GenerateReceipt";
import PayrollConfigurationCard from "./PayrollConfigurationCard";

interface Props {
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
    entityPayrollManagement: IPayrollManagement | undefined;
    setEntityPayrollManagement: (entity: IPayrollManagement) => void;
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

const PayrollPayView = ({
    toast,
    setSubmitted,
    entityPayrollManagement,
    setEntityPayrollManagement,
}: Props) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IPayrollPay>({
        defaultValues: {
            idPayrollArea: entityPayrollManagement?.idPayrollArea,
        },
    });

    const initialPayrollNumber = useRef<number | null>(null);

    const [period, setPeriod] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleDelete, setIsVisibleDelete] = useState(false);
    const [employees, setEmployees] = useState<IAddEmployee>();
    const [byEmployees, setByEmployees] = useState(true);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [viewEmployees, setViewEmployees] = useState(false);
    const [generatefile, setGenerateFiles] = useState(false);
    const [generateReceipt, setGenerateReceipt] = useState(false);

    const payrollNumber = watch("payrollNumber");

    const addEntity = useAddEntityQuery({
        service: generatePayrollPayService,
        reset,
        setSubmitted,
        toast,
    });

    const handleAdd = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        setIsVisible(true);
    };

    const handleDelete = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        setIsVisibleDelete(true);
    };

    const handleGenerateReceipt = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        setGenerateReceipt(true);
    };

    const getLastPayroll = useCallback(async () => {
        const payrollArea = watch("idPayrollArea");
        let date = entityPayrollManagement?.date;

        if (date) {
            date = new Date(date);
        }

        const period: IPayrollManagementByPayrollNumber = {
            payrollNumber:
                watch("payrollNumber") ??
                entityPayrollManagement?.payrollNumber,
            idPayrollArea: payrollArea ?? 1,
            PayrollYear: date ? date.getFullYear() : new Date().getFullYear(),
        };

        const payrollData = (await payrollManagementByPayrollNumberService.post(
            period
        )) as IPayrollManagement;
        setEntityPayrollManagement(payrollData);
    }, [watch, entityPayrollManagement, setEntityPayrollManagement]);

    useEffect(() => {
        if (payrollNumber && initialPayrollNumber.current === null) {
            initialPayrollNumber.current =
                entityPayrollManagement?.payrollNumber ?? 0;
        }
    }, [payrollNumber]);

    useEffect(() => {
        if (entityPayrollManagement?.idPayrollArea) {
            setValue("idPayrollArea", entityPayrollManagement.idPayrollArea);
        }
    }, [entityPayrollManagement, setValue]);

    const onSubmit = async (data: IPayrollPay) => {
        data.payrollNumber =
            data.payrollNumber ?? entityPayrollManagement?.payrollNumber;
        data.payrollStartDate = new Date(
            entityPayrollManagement!.payrollPeriodStart
        );
        data.endDate = new Date(entityPayrollManagement!.payrollPeriodEnd);
        data.startDate = new Date(
            entityPayrollManagement!.retroactivePeriodLimit
        );
        data.employeeCodes = employees?.employees;
        data.toExclude = !byEmployees;
        data.isTest = activeIndex === 1;

        const periodForTest = new Date(
            entityPayrollManagement!.payrollPeriodStart
        );
        data.period = `${data.payrollNumber}/${periodForTest.getFullYear()}`;

        setLoading(true);

        await addEntity
            .mutateAsync(data, {
                onSuccess: () => {
                    setLoading(false);
                    setCompleted(true);
                    setViewEmployees(false);
                },
                onError: () => {
                    setLoading(false);
                    setViewEmployees(false);
                },
            })
            .then((res: IPayrollPay) => {
                activeIndex === 1
                    ? executeReport(
                          res.getPayrollExecutionTest! as IGetPayrollExecutionTest[]
                      )
                    : executeReport(
                          res.getPayrollExecution! as IGetPayrollExecution[]
                      );
            });
    };

    let options: string[] = ["Mensual", "Quincenal", "Temporeros"];

    const getLastRecord = async (idPayrollArea: number) => {
        const result = (await lastPayrollManagementService.getById(
            idPayrollArea
        )) as IPayrollManagement;
        setEntityPayrollManagement(result);
    };

    const executeReport = async (
        data: IGetPayrollExecution[] | IGetPayrollExecutionTest[]
    ) => {
        if (!data?.length) return;

        const isRegularExecution = activeIndex === 0;

        const getPayrollExecutionWithoutIdentifier = isRegularExecution
            ? (data as IGetPayrollExecution[]).map(
                  ({ identifier, ...rest }) => rest
              )
            : (data as IGetPayrollExecutionTest[]).map(
                  ({ idPayrollTestCode, ...rest }) => rest
              );

        await openNewTabWithInvoiceViewer(getPayrollExecutionWithoutIdentifier);
    };

    const openNewTabWithInvoiceViewer = async (
        payrollData: Omit<
            IGetPayrollExecution | IGetPayrollExecutionTest,
            "identifier" | "idPayrollTestCode"
        >[]
    ) => {
        const newTab = window.open("", "_blank");
        if (newTab) {
            newTab.document.write('<div id="invoice-viewer-root"></div>');
            newTab.document.close();

            const rootElement = newTab.document.getElementById(
                "invoice-viewer-root"
            );
            if (rootElement) {
                const root = createRoot(rootElement);
                root.render(<InvoiceViewer data={payrollData} />);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {loading && (
                <div style={style}>
                    <ProgressSpinner aria-label="Ejecutando proceso de Nómina..." />
                </div>
            )}

            {generatefile && (
                <GenerateFiles
                    setContent={setGenerateFiles}
                    content={generatefile}
                    setEmployees={setEmployees}
                    employees={employees}
                    setViewEmployees={setViewEmployees}
                />
            )}
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <ConfirmPopup />

                    {completed && (
                        <div style={style}>
                            <div className="card flex flex-column gap-3 align-items-center">
                                <div className="card">
                                    <h5 className="my-2">
                                        Nomina ejecutada correctamente!
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
                                    <Button
                                        onClick={() => setCompleted(false)}
                                        icon="pi pi-times"
                                        label="Cerrar"
                                        className="p-button-danger"
                                    />
                                    <Link href="/payrollDetail">
                                        <Button
                                            icon="pi pi-list"
                                            label="Ver detalles"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    <PayrollConfigurationCard
                        entity={entityPayrollManagement}
                        isTest={activeIndex === 1}
                    />
                    <div className="card">
                        <div className="flex mb-2 gap-2 justify-content-end">
                            <Button
                                onClick={() => setActiveIndex(0)}
                                className="w-2rem h-2rem p-0"
                                rounded
                                outlined={activeIndex !== 0}
                                label="1"
                            />
                            <Button
                                onClick={() => setActiveIndex(1)}
                                className="w-2rem h-2rem p-0"
                                rounded
                                outlined={activeIndex !== 1}
                                label="2"
                            />
                        </div>
                        <TabView
                            activeIndex={activeIndex}
                            onTabChange={(e) => setActiveIndex(e.index)}
                        >
                            <TabPanel header={"Nomina Real"}>
                                {activeIndex == 0 && (
                                    <>
                                        <div
                                            className="p-fluid formgrid grid"
                                            style={{
                                                marginTop: "15px",
                                                marginBottom: "15px",
                                                display: "flex",
                                                justifyContent: "space-around",
                                                width: "100%",
                                            }}
                                        >
                                            <div className="field col-12 md:col-3">
                                                <label htmlFor="idPayrollArea">
                                                    <strong>
                                                        Area de Nómina
                                                    </strong>
                                                </label>
                                                <GenericDropDown
                                                    id="idPayrollArea"
                                                    isValid={
                                                        !!errors.idPayrollArea
                                                    }
                                                    setValue={setValue}
                                                    watch={watch}
                                                    text="name"
                                                    useQuery={
                                                        usePayrollAreaQuery
                                                    }
                                                    idValueEdit={
                                                        entityPayrollManagement?.idPayrollArea
                                                    }
                                                    // getLastRecord(e.value);
                                                />
                                            </div>
                                            {/* <div className="field col-12 md:col-2">
                                                <h6 className="mt-2">
                                                    {period
                                                        ? "Periodo actual"
                                                        : "Otro periodo"}
                                                </h6>
                                                <InputSwitch
                                                    name="otherPeriod"
                                                    checked={period}
                                                    onChange={(e) =>
                                                        setPeriod(
                                                            e.value ?? false
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="field col-12 md:col-2">
                                                <label>
                                                    {!period ? (
                                                        <strong>
                                                            # Nómina
                                                        </strong>
                                                    ) : (
                                                        "# Nómina"
                                                    )}
                                                </label>
                                                <InputNumber
                                                    id="payrollNumber"
                                                    value={
                                                        watch(
                                                            "payrollNumber"
                                                        ) ??
                                                        entityPayrollManagement?.payrollNumber
                                                    }
                                                    onChange={(e) => {
                                                        setValue(
                                                            "payrollNumber",
                                                            e.value!
                                                        );
                                                        getLastPayroll();
                                                    }}
                                                    min={1}
                                                    format={false}
                                                    showButtons
                                                    disabled={period}
                                                />
                                            </div> */}
                                            <div className="field col-12 md:col-3">
                                                <label
                                                    htmlFor="idStatus"
                                                    className="w-full"
                                                >
                                                    {!period ? (
                                                        <strong>
                                                            Descripción
                                                        </strong>
                                                    ) : (
                                                        "Descripción"
                                                    )}
                                                </label>
                                                <InputText
                                                    {...register(
                                                        "payrollName",
                                                        {
                                                            required: true,
                                                        }
                                                    )}
                                                    id="Description"
                                                    placeholder="Descripcion..."
                                                    className={classNames(
                                                        {
                                                            "p-invalid":
                                                                errors.payrollName,
                                                        },
                                                        "w-full"
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className="p-fluid formgrid grid"
                                            style={{
                                                marginTop: "20px",
                                                display: "flex",
                                                justifyContent: "space-around",
                                                width: "98%",
                                            }}
                                        >
                                            <div className="field col-12 md:col-3 mt-2">
                                                <Button
                                                    label="Eliminar nomina"
                                                    onClick={handleDelete}
                                                />
                                            </div>
                                            <div className="field col-12 md:col-4">
                                                <h6>
                                                    {byEmployees
                                                        ? "Por empleado"
                                                        : "Excluir Empleados"}
                                                </h6>
                                                <InputSwitch
                                                    name="ByEmployee"
                                                    checked={byEmployees}
                                                    onChange={(e) =>
                                                        setByEmployees(
                                                            e.value ?? false
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="field col-12 md:col-3 mt-2 mr-5">
                                                <Button
                                                    label={
                                                        viewEmployees
                                                            ? "Ver empleados"
                                                            : byEmployees
                                                            ? "Agregar empleados"
                                                            : "Excluir empleados"
                                                    }
                                                    onClick={handleAdd}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </TabPanel>
                            <TabPanel header="Nomina Simulada">
                                {activeIndex == 1 && (
                                    <>
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
                                                <label htmlFor="idPayrollArea">
                                                    <strong>
                                                        Area de Nómina
                                                    </strong>
                                                </label>
                                                <GenericDropDown
                                                    id="idPayrollArea"
                                                    isValid={
                                                        !!errors.idPayrollArea
                                                    }
                                                    setValue={setValue}
                                                    watch={watch}
                                                    text="name"
                                                    useQuery={
                                                        usePayrollAreaQuery
                                                    }
                                                    idValueEdit={
                                                        entityPayrollManagement?.idPayrollArea
                                                    }
                                                    // getLastRecord(e.value);
                                                />
                                            </div>
                                            {/* <div className="field col-12 md:col-2">
                                                <h6 className="mt-2">
                                                    {period
                                                        ? "Periodo actual"
                                                        : "Otro periodo"}
                                                </h6>
                                                <InputSwitch
                                                    name="otherPeriod"
                                                    checked={period}
                                                    onChange={(e) =>
                                                        setPeriod(
                                                            e.value ?? false
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="field col-12 md:col-1">
                                                <label>
                                                    {!period ? (
                                                        <strong>
                                                            # Nómina
                                                        </strong>
                                                    ) : (
                                                        "# Nómina"
                                                    )}
                                                </label>
                                                <InputNumber
                                                    id="payrollNumber"
                                                    value={
                                                        watch(
                                                            "payrollNumber"
                                                        ) ??
                                                        entityPayrollManagement?.payrollNumber
                                                    }
                                                    onChange={(e) => {
                                                        setValue(
                                                            "payrollNumber",
                                                            e.value!
                                                        );
                                                        getLastPayroll();
                                                    }}
                                                    min={1}
                                                    format={false}
                                                    showButtons
                                                    disabled={period}
                                                />
                                            </div> */}
                                            <div className="field col-12 md:col-3">
                                                <label
                                                    htmlFor="idStatus"
                                                    className="w-full"
                                                >
                                                    {!period ? (
                                                        <strong>
                                                            Descripción
                                                        </strong>
                                                    ) : (
                                                        "Descripción"
                                                    )}
                                                </label>
                                                <InputText
                                                    {...register(
                                                        "payrollName",
                                                        {
                                                            required: true,
                                                        }
                                                    )}
                                                    id="Description"
                                                    placeholder="Descripcion..."
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className="p-fluid formgrid grid"
                                            style={{
                                                marginTop: "20px",
                                                display: "flex",
                                                justifyContent: "space-around",
                                                width: "92%",
                                            }}
                                        >
                                            {activeIndex !== 1 && (
                                                <div className="field col-12 md:col-3 mt-2">
                                                    <Button
                                                        label="Eliminar nomina"
                                                        onClick={handleDelete}
                                                    />
                                                </div>
                                            )}
                                            <div className="field col-12 md:col-3">
                                                <h6>
                                                    {byEmployees
                                                        ? "Por empleado"
                                                        : "Excluir Empleados"}
                                                </h6>
                                                <InputSwitch
                                                    name="ByEmployee"
                                                    checked={byEmployees}
                                                    onChange={(e) =>
                                                        setByEmployees(
                                                            e.value ?? false
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="field col-12 md:col-3 mt-2 mr-1">
                                                <Button
                                                    label={
                                                        byEmployees
                                                            ? "Agregar empleados"
                                                            : "Excluir empleados"
                                                    }
                                                    onClick={handleAdd}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </TabPanel>
                        </TabView>
                    </div>
                    {isVisible && (
                        <AddOrExcludeEmployee
                            content={isVisible}
                            setContent={setIsVisible!}
                            handleAdd={handleAdd}
                            toast={toast}
                            setSubmitted={setSubmitted}
                            setEmployees={setEmployees}
                            employees={employees}
                            setViewEmployees={setViewEmployees}
                        />
                    )}
                    {isVisibleDelete && (
                        <DeletePayrollDialog
                            isVisible={isVisibleDelete}
                            setIsVisible={setIsVisibleDelete!}
                            handleAdd={handleDelete}
                            toast={toast}
                            setSubmitted={setSubmitted}
                            setEmployees={setEmployees}
                            employees={employees}
                        />
                    )}
                    {generateReceipt && (
                        <GenerateReceiptDialog
                            isVisible={generateReceipt}
                            setIsVisible={setGenerateReceipt!}
                            handleGenerateReceipt={handleGenerateReceipt}
                            toast={toast}
                            setSubmitted={setSubmitted}
                            setEmployees={setEmployees}
                            employees={employees}
                        />
                    )}
                    <DialogFooterButtonPayrollPay
                        isReadOnly={
                            activeIndex === 0 &&
                            (entityPayrollManagement?.idPayrollManagement ==
                                0 ||
                                entityPayrollManagement?.idStatus !== 151 ||
                                loading)
                        }
                        setGenereateFiles={() => setGenerateFiles(true)}
                        setGenereate={() => setGenerateReceipt(true)}
                    />
                </div>
            </div>
        </form>
    );
};

export default PayrollPayView;
