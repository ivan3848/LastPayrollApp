"use client";
import { payrollManagementByPayrollNumberService } from "@/Features/payrollManagement/payrollManagementService";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import { Calendar } from "primereact/calendar";
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

interface Props {
    entity: IPayrollPay | null;
    setEntity?: (entity: IPayrollManagement) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
    entityPayrollManagement: IPayrollManagement | undefined;
    setEntityPayrollManagement: (entity: IPayrollManagement) => void;
}

const PayrollPayView = ({
    entity,
    setEntity,
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
    } = useForm<IPayrollPay>();

    const initialPayrollNumber = useRef<number | null>(null);
    const [period, setPeriod] = useState(true);
    const [vacation, setVacation] = useState(false);

    const payrollNumber = watch("payrollNumber");
    const addEntity = useAddEntityQuery({
        service: generatePayrollPayService,
    });

    const updateFormValues = useCallback(
        (data: IPayrollPay) => {
            Object.entries(data).forEach(([key, value]) => {
                if (
                    [
                        "lastModifiedDate",
                        "payrollPeriodStart",
                        "date",
                        "payrollPeriodEnd",
                    ].includes(key)
                ) {
                    value = new Date(value);
                }
                setValue(key as keyof IPayrollPay, value);
            });
        },
        [setValue]
    );

    const getLastPayroll = useCallback(
        async (payNumber?: number) => {
            const payrollArea = watch("idPayrollArea");
            let date = entityPayrollManagement?.date;

            if (date) {
                date = new Date(date);
            }

            const period: IPayrollManagementByPayrollNumber = {
                payrollNumber: payNumber ?? watch("payrollNumber"),
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
        [watch, entityPayrollManagement, setEntityPayrollManagement]
    );

    useEffect(() => {
        if (entity) {
            updateFormValues(entity);
        }
    }, [entity, updateFormValues]);

    useEffect(() => {
        if (payrollNumber && initialPayrollNumber.current === null) {
            initialPayrollNumber.current = payrollNumber;
        }
    }, [payrollNumber]);

    const onSubmit = (data: IPayrollPay) => {
        data.payrollStartDate = new Date(entityPayrollManagement!.payrollPeriodStart);
        data.endDate = new Date(entityPayrollManagement!.payrollPeriodEnd);
        data.startDate = new Date(entityPayrollManagement!.retroactivePeriodLimit);
        console.log("Submitting:", data);
        addEntity.mutate(data);
    };

    let options: string[] = ["Mensual", "Quincenal"];

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-12">
                <div className="card">
                    <h5 className="mt-1">Configuración de nómina</h5>
                    <PayrollConfigurationCard
                        entity={entityPayrollManagement}
                    />
                    <div className="card">
                        <TabView>
                            <TabPanel header="Nomina Real">
                                <form onSubmit={handleSubmit(onSubmit)}>
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
                                                    getLastPayroll(
                                                        watch("payrollNumber")
                                                    );
                                                }}
                                                id="idPayrollArea"
                                                options={options}
                                            />
                                        </div>
                                        <div className="field col-12 md:col-2">
                                            <h6 className="mt-2">
                                                {period
                                                    ? "Periodo actual"
                                                    : "Otro periodo"}
                                            </h6>
                                            <InputSwitch
                                                name="IsChristmasPayment"
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
                                                value={
                                                    payrollNumber ||
                                                    initialPayrollNumber.current
                                                }
                                                onChange={(e) => {
                                                    setValue(
                                                        "payrollNumber",
                                                        e.value!
                                                    );
                                                    getLastPayroll(e.value!);
                                                }}
                                                min={1}
                                                format={false}
                                                showButtons
                                                disabled={period}
                                            />
                                        </div>
                                        <div className="field col-12 md:col-3">
                                            <label
                                                id="DateChange"
                                                htmlFor="DateChange"
                                            >
                                                Fecha de inicio
                                            </label>
                                            <Calendar
                                                {...register("payrollStartDate", {
                                                    required: true,
                                                })}
                                                id="payrollPeriodStart"
                                                value={
                                                    new Date(
                                                        entityPayrollManagement?.payrollPeriodStart!
                                                    )
                                                }
                                                showIcon
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
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
                                            <label
                                                htmlFor="idStatus"
                                                className="w-full"
                                            >
                                                <strong>Descripción</strong>
                                            </label>
                                            <InputText
                                                {...register("payrollName", {
                                                    required: true,
                                                })}
                                                id="Description"
                                                placeholder="Descripcion..."
                                            />
                                        </div>
                                        <div className="field col-12 md:col-3">
                                            <h6>Por empleado</h6>
                                            <InputSwitch
                                                name="ByEmployee"
                                                checked={false}
                                                onChange={(e) =>
                                                    setPeriod(e.value ?? false)
                                                }
                                            />
                                        </div>
                                        <div className="field col-12 md:col-3">
                                            <h6>Excluir empleados</h6>
                                            <InputSwitch
                                                name="ExcludedEmployees"
                                                checked={vacation}
                                                onChange={(e) =>
                                                    setVacation(
                                                        e.value ?? false
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </form>
                            </TabPanel>
                            <TabPanel header="Nomina Simulada">
                                <p>
                                    Sed ut perspiciatis unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam, eaque ipsa
                                    quae ab illo inventore veritatis et quasi
                                    architecto beatae vitae dicta sunt
                                    explicabo. Nemo enim ipsam voluptatem quia
                                    voluptas sit aspernatur aut odit aut fugit,
                                    sed quia consequuntur magni dolores eos qui
                                    ratione voluptatem sequi nesciunt.
                                    Consectetur, adipisci velit, sed quia non
                                    numquam eius modi.
                                </p>
                            </TabPanel>
                        </TabView>
                    </div>
                    <DialogFooterButtonPayrollPay
                        isReadOnly={
                            entityPayrollManagement?.idPayrollManagement == 0
                        }
                    />
                </div>
            </div>
        </form>
    );
};

export default PayrollPayView;
