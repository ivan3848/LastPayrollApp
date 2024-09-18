"use client";
import { payrollManagementByPayrollNumberService } from "@/Features/payrollManagement/payrollManagementService";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import { InputNumber } from "primereact/inputnumber";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { TabPanel, TabView } from "primereact/tabview";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { generatePayrollPayService } from "../Services/payrollPayService";
import { IPayrollPay } from "../types/IPayrollPay";
import DialogFooterButtonPayrollPay from "./DialogFooterButtonPayrollPay";
import PayrollConfigurationCard from "./PayrollConfigurationCard";
import { Toast } from "primereact/toast";
import AddOrExcludeEmployee, { IAddEmployee } from "./AddOrExcludeEmployee";
import { Button } from "primereact/button";
import DeletePayrollDialog from "./DeletePayrollDialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { ConfirmPopup } from "primereact/confirmpopup";
import { classNames } from "primereact/utils";

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
            idPayrollArea: entityPayrollManagement?.idPayrollArea
        }
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

    const payrollNumber = watch("payrollNumber");

    const addEntity = useAddEntityQuery({
        service: generatePayrollPayService,
        reset,
        setSubmitted,
        toast,
    });

    const handleAdd = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setIsVisible(true);
    };

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setIsVisibleDelete(true);
    };

    const getLastPayroll = useCallback(
        async () => {
            const payrollArea = watch("idPayrollArea");
            let date = entityPayrollManagement?.date;

            if (date) {
                date = new Date(date);
            }

            const period: IPayrollManagementByPayrollNumber = {
                payrollNumber: watch("payrollNumber") ?? entityPayrollManagement?.payrollNumber,
                idPayrollArea: payrollArea ?? 1,
                PayrollYear: date
                    ? date.getFullYear()
                    : new Date().getFullYear(),
            };

            const payrollData =
                (await payrollManagementByPayrollNumberService.post(
                    period
                )) as IPayrollManagement;
            setEntityPayrollManagement(payrollData);
        },
        [watch, entityPayrollManagement, setEntityPayrollManagement, loading]
    );

    useEffect(() => {
        if (payrollNumber && initialPayrollNumber.current === null) {
            initialPayrollNumber.current = entityPayrollManagement?.payrollNumber ?? 0;
        }
    }, [payrollNumber]);

    useEffect(() => {
        if (entityPayrollManagement?.idPayrollArea) {
            setValue('idPayrollArea', entityPayrollManagement.idPayrollArea);
        }
    }, [entityPayrollManagement, setValue]);

    const onSubmit = async (data: IPayrollPay) => {
        data.payrollNumber = data.payrollNumber ?? entityPayrollManagement?.payrollNumber;
        data.payrollStartDate = new Date(entityPayrollManagement!.payrollPeriodStart);
        data.endDate = new Date(entityPayrollManagement!.payrollPeriodEnd);
        data.startDate = new Date(entityPayrollManagement!.retroactivePeriodLimit);
        data.employees = employees?.employees;
        data.toExclude = !byEmployees;
        data.isTest = activeIndex === 1;

        setLoading(true);

        try {
            await addEntity.mutateAsync(data);
        } finally {
            setLoading(false);
            setCompleted(true);
            setViewEmployees(false);
        }
    };

    let options: string[] = ["Mensual", "Quincenal"];

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {loading && (
                <div style={style}>
                    <ProgressSpinner aria-label="Ejecutando proceso de Nómina..." />
                </div>
            )}
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <ConfirmPopup />

                    {completed &&
                        <div style={style}>
                            <div className="card flex flex-column gap-3 align-items-center">
                                <div className="card">
                                    <h5 className="my-2">
                                        Nomina ejecutada correctamente!
                                        <i className="pi pi-check-circle ml-2"
                                            style={{ fontSize: '1.3rem', marginTop: '0.2rem' }}
                                        />
                                    </h5>
                                </div>
                                <div className="flex gap-3">
                                    <Button
                                        onClick={() => setCompleted(false)}
                                        icon="pi pi-times" label="Cerrar"
                                        className="p-button-danger" />
                                    <Button
                                        onClick={() => { }}
                                        icon="pi pi-check"
                                        label="Ver detalles" />
                                </div>
                            </div>
                        </div>
                    }

                    <PayrollConfigurationCard
                        entity={entityPayrollManagement}
                        isTest={activeIndex === 1}
                    />
                    <div className="card">
                        <div className="flex mb-2 gap-2 justify-content-end">
                            <Button
                                onClick={() => setActiveIndex(0)}
                                className="w-2rem h-2rem p-0" rounded
                                outlined={activeIndex !== 0} label="1" />
                            <Button onClick={() => setActiveIndex(1)}
                                className="w-2rem h-2rem p-0"
                                rounded outlined={activeIndex !== 1}
                                label="2" />
                        </div>
                        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)
                        }>
                            <TabPanel header={"Nomina Real"}>
                                {activeIndex == 0 && (<><div
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
                                            <strong>Area de Nómina</strong>
                                        </label>
                                        <SelectButton
                                            {...register("idPayrollArea", {
                                                required: true,
                                            })}
                                            value={
                                                watch("idPayrollArea") === 2
                                                    ? "Mensual"
                                                    : "Quincenal"
                                            }
                                            onChange={(e) => {
                                                setValue(
                                                    "idPayrollArea",
                                                    e.value === "Mensual"
                                                        ? 2
                                                        : 1
                                                );
                                                getLastPayroll();
                                            }}
                                            id="idPayrollArea"
                                            options={options}
                                            className={classNames(
                                                {
                                                    "p-invalid": errors.idPayrollArea,
                                                },
                                                "w-full"
                                            )}
                                        />
                                    </div>
                                    <div className="field col-12 md:col-2">
                                        <h6 className="mt-2">
                                            {period
                                                ? "Periodo actual"
                                                : "Otro periodo"}
                                        </h6>
                                        <InputSwitch
                                            name="otherPeriod"
                                            checked={period}
                                            onChange={(e) =>
                                                setPeriod(e.value ?? false)
                                            }
                                        />
                                    </div>
                                    <div className="field col-12 md:col-1">
                                        <label>
                                            {!period ? (
                                                <strong># Nómina</strong>
                                            ) : (
                                                "# Nómina"
                                            )}
                                        </label>
                                        <InputNumber
                                            id="payrollNumber"
                                            value={watch('payrollNumber') ?? entityPayrollManagement?.payrollNumber}
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
                                    </div>
                                    <div className="field col-12 md:col-3">
                                        <label
                                            htmlFor="idStatus"
                                            className="w-full"
                                        >
                                            {!period ? (
                                                <strong>Descripción</strong>
                                            ) : (
                                                "Descripción"
                                            )}
                                        </label>
                                        <InputText
                                            {...register("payrollName", {
                                                required: true,
                                            })}
                                            id="Description"
                                            placeholder="Descripcion..."
                                            className={classNames(
                                                {
                                                    "p-invalid": errors.payrollName,
                                                },
                                                "w-full"
                                            )}
                                        />
                                    </div>
                                </div>
                                    <div className="p-fluid formgrid grid"
                                        style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "space-around",
                                            width: "92%",
                                        }}>

                                        <div className="field col-12 md:col-3 mt-2">
                                            <Button
                                                label="Eliminar nomina"
                                                onClick={handleDelete}
                                            />
                                        </div>
                                        <div className="field col-12 md:col-3">
                                            <h6>{byEmployees ? 'Por empleado' : 'Excluir Empleados'}</h6>
                                            <InputSwitch
                                                name="ByEmployee"
                                                checked={byEmployees}
                                                onChange={(e) =>
                                                    setByEmployees(e.value ?? false)
                                                }
                                            />
                                        </div>
                                        <div className="field col-12 md:col-3 mt-2 mr-1">
                                            <Button
                                                label={
                                                    viewEmployees ? 'Ver empleados'
                                                        : byEmployees ? "Agregar empleados" : "Excluir empleados"}
                                                onClick={handleAdd}
                                            />
                                        </div>
                                    </div>
                                </>)}
                            </TabPanel>
                            <TabPanel header="Nomina Simulada">
                                {activeIndex == 1 && (<><div
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
                                            <strong>Area de Nómina</strong>
                                        </label>
                                        <SelectButton
                                            {...register("idPayrollArea", {
                                                required: true,
                                            })}
                                            value={watch("idPayrollArea") === 2
                                                ? "Mensual"
                                                : "Quincenal"}
                                            onChange={(e) => {
                                                setValue(
                                                    "idPayrollArea",
                                                    e.value === "Mensual"
                                                        ? 2
                                                        : 1
                                                );
                                                getLastPayroll();
                                            }}
                                            id="idPayrollArea"
                                            options={options}
                                            defaultValue={1} />
                                    </div>
                                    <div className="field col-12 md:col-2">
                                        <h6 className="mt-2">
                                            {period
                                                ? "Periodo actual"
                                                : "Otro periodo"}
                                        </h6>
                                        <InputSwitch
                                            name="otherPeriod"
                                            checked={period}
                                            onChange={(e) => setPeriod(e.value ?? false)} />
                                    </div>
                                    <div className="field col-12 md:col-1">
                                        <label>
                                            {!period ? (
                                                <strong># Nómina</strong>
                                            ) : (
                                                "# Nómina"
                                            )}
                                        </label>
                                        <InputNumber
                                            id="payrollNumber"
                                            value={watch('payrollNumber') ?? entityPayrollManagement?.payrollNumber}
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
                                            disabled={period} />
                                    </div>
                                    <div className="field col-12 md:col-3">
                                        <label
                                            htmlFor="idStatus"
                                            className="w-full"
                                        >
                                            {!period ? (
                                                <strong>Descripción</strong>
                                            ) : (
                                                "Descripción"
                                            )}
                                        </label>
                                        <InputText
                                            {...register("payrollName", {
                                                required: true,
                                            })}
                                            id="Description"
                                            placeholder="Descripcion..." />
                                    </div>
                                </div><div className="p-fluid formgrid grid"
                                    style={{
                                        marginTop: "20px",
                                        display: "flex",
                                        justifyContent: "space-around",
                                        width: "92%",
                                    }}>
                                        {activeIndex !== 1 &&
                                            <div className="field col-12 md:col-3 mt-2">
                                                <Button
                                                    label="Eliminar nomina"
                                                    onClick={handleDelete} />
                                            </div>
                                        }
                                        <div className="field col-12 md:col-3">
                                            <h6>{byEmployees ? 'Por empleado' : 'Excluir Empleados'}</h6>
                                            <InputSwitch
                                                name="ByEmployee"
                                                checked={byEmployees}
                                                onChange={(e) => setByEmployees(e.value ?? false)} />
                                        </div>
                                        <div className="field col-12 md:col-3 mt-2 mr-1">
                                            <Button
                                                label={byEmployees ? "Agregar empleados" : "Excluir empleados"}
                                                onClick={handleAdd} />
                                        </div>
                                    </div></>)}
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
                    <DialogFooterButtonPayrollPay
                        isReadOnly={
                            entityPayrollManagement?.idPayrollManagement == 0
                            || entityPayrollManagement?.idStatus !== 151
                            || loading
                        }
                    />
                </div>
            </div>
        </form>
    );
};

export default PayrollPayView;
