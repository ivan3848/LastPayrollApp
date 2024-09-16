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

interface Props {
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
    entityPayrollManagement: IPayrollManagement | undefined;
    setEntityPayrollManagement: (entity: IPayrollManagement) => void;
}

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
    } = useForm<IPayrollPay>();

    const initialPayrollNumber = useRef<number | null>(null);

    const [period, setPeriod] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleDelete, setIsVisibleDelete] = useState(false);
    const [employees, setEmployees] = useState<IAddEmployee>();
    const [byEmployees, setByEmployees] = useState(true);

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
        async (payNumber?: number) => {
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
        [watch, entityPayrollManagement, setEntityPayrollManagement]
    );

    useEffect(() => {
        if (payrollNumber && initialPayrollNumber.current === null) {
            initialPayrollNumber.current = payrollNumber;
        }
    }, [payrollNumber]);

    const onSubmit = (data: IPayrollPay) => {
        data.payrollStartDate = new Date(entityPayrollManagement!.payrollPeriodStart);
        data.endDate = new Date(entityPayrollManagement!.payrollPeriodEnd);
        data.startDate = new Date(entityPayrollManagement!.retroactivePeriodLimit);
        data.employees = employees?.employees;
        data.toExclude = !byEmployees;

        addEntity.mutate(data);
    };

    let options: string[] = ["Mensual", "Quincenal"];

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <h5 className="mt-1">Configuración de nómina</h5>
                    <PayrollConfigurationCard
                        entity={entityPayrollManagement}
                    />
                    <div className="card">
                        <TabView>
                            <TabPanel header="Nomina Real">
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
                                </div>
                                <div
                                    className="p-fluid formgrid grid"
                                    style={{
                                        marginTop: "20px",
                                        display: "flex",
                                        justifyContent: "space-evenly",
                                        width: "92%",
                                    }}
                                >
                                    <div className="field col-12 md:col-3 mt-2">
                                        <Button
                                            label="Eliminar nomina"
                                            onClick={handleDelete}
                                        />
                                    </div>
                                    <div className="field col-12 md:col-2">
                                        <h6>{byEmployees ? 'Por empleado' : 'Excluir Empleados'}</h6>
                                        <InputSwitch
                                            name="ByEmployee"
                                            checked={byEmployees}
                                            onChange={(e) =>
                                                setByEmployees(e.value ?? false)
                                            }
                                        />
                                    </div>
                                    <div className="field col-12 md:col-3 mt-2">
                                        <Button
                                            label={byEmployees ? "Agregar empleados" : "Excluir empleados"}
                                            onClick={handleAdd}
                                        />
                                    </div>
                                </div>
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
                    {isVisible && (
                        <AddOrExcludeEmployee
                            content={isVisible}
                            setContent={setIsVisible!}
                            handleAdd={handleAdd}
                            toast={toast}
                            setSubmitted={setSubmitted}
                            setEmployees={setEmployees}
                            employees={employees}
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
                        }
                    />
                </div>
            </div>
        </form>
    );
};

export default PayrollPayView;
