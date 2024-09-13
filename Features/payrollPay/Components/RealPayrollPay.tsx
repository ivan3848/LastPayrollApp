import useEmployeeQuery from '@/Features/employee/Hooks/useEmployeeQuery';
import DialogFooterButtons from '@/Features/Shared/Components/DialogFooterButtons';
import GenericDropDown from '@/Features/Shared/Components/GenericDropDown';
import GenericStatusDropDown from '@/Features/Shared/Components/GenericStatusDropDown';
import { Calendar } from 'primereact/calendar';
import { InputSwitch } from 'primereact/inputswitch';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { IPayrollPay } from '../types/IPayrollPay';
import { set } from 'zod';

interface Props {
    onSubmit: (data: any) => void
    entity: IPayrollPay | null;
    handleSubmit: (value: boolean) => void;
    watch: any;
    setValue: (name: string, value: any) => void;
}

const initialPayrollNumber = useRef<number | null>(null);

const RealPayrollPay = ({
    entity,
    onSubmit,
    handleSubmit,
    watch,
    setValue,
}: Props) => {

    const payrollNumber = watch("payrollNumber");

    useEffect(() => {
        if (payrollNumber && initialPayrollNumber.current === null) {
            initialPayrollNumber.current = payrollNumber;
        }
    }, [payrollNumber]);

    useEffect(() => {
        if (entity) {
            updateFormValues(entity);
        }
    }, [entity]);

    const updateFormValues = (data: IPayrollPay) => {
        Object.entries(data).forEach(([key, value]) => {
            if (["lastModifiedDate", "payrollPeriodStart",
                "date", "payrollPeriodEnd"].includes(key)) {
                value = new Date(value);
            }
            setValue(key as keyof IPayrollPay, value);
        });
    };


    return (
        <div className="card">
            {/* <form onSubmit={handleSubmit(onSubmit)}>
                <h4 style={{ marginBottom: "30px" }}>
                    Desvincular Empleado
                </h4>
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
                            htmlFor="IdChangeManager"
                            className="w-full"
                        >
                            Medida
                        </label>
                        <GenericDropDown
                            id="idHierarchyPositionManager"
                            isValid={!!errors.IdStatusFired}
                            text="name"
                            useQuery={useEmployeeQuery}
                            setValue={setValue}
                            watch={watch}
                            param={params}
                        />
                        {errors.IdStatusFired && (
                            <small className="p-invalid text-danger">
                                {errors.IdStatusFired.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-3">
                        <label htmlFor="idStatus" className="w-full">
                            Motivo
                        </label>
                        <GenericStatusDropDown
                            id="IdCancelationType"
                            isValid={!!errors.IdCancelationType}
                            setValue={setValue}
                            watch={watch}
                            isFocus={true}
                            tableName="SalaryNewsStatus"
                        />
                        {errors.IdCancelationType && (
                            <small className="p-invalid text-danger">
                                {errors.IdCancelationType.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-3">
                        <label id="DateChange" htmlFor="DateChange">
                            Fecha de inicio
                        </label>
                        <Calendar
                            {...register("FiredDate")}
                            name="FiredDate"
                            value={new Date()}
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
                            {...register("IsChristmasPayment")}
                            name="IsChristmasPayment"
                            checked={pagoNavidad}
                            onChange={(e) =>
                                setPagoNavidad(e.value ?? false)
                            }
                        />
                        <h6>Pre-Aviso</h6>
                        <InputSwitch
                            {...register("IsNotice")}
                            name="IsNotice"
                            checked={notice}
                            onChange={(e) =>
                                setNotice(e.value ?? false)
                            }
                        />
                    </div>
                    <div className="field col-12 md:col-3">
                        <h6>Ha tomado vacaciones este año?</h6>
                        <InputSwitch
                            {...register("IsTakenVacation")}
                            name="IsTakenVacation"
                            checked={vacation}
                            onChange={(e) =>
                                setVacation(e.value ?? false)
                            }
                        />
                        <h6>Cesantia</h6>
                        <InputSwitch
                            {...register("IsUnemployment")}
                            name="IsUnemployment"
                            checked={unemployment}
                            onChange={(e) =>
                                setUnemployment(e.value ?? false)
                            }
                        />
                    </div>
                    <div className="field col-12 md:col-3">
                        <label htmlFor="Description">Descripción</label>
                        <InputTextarea
                            {...register("Comment")}
                            id="Comment"
                            placeholder="Ingrese descripción..."
                            rows={3}
                            cols={30}
                        />
                    </div>
                </div>
                <DialogFooterButtons hideDialog={() => { }} />
            </form> */}
        </div>
    )
}

export default RealPayrollPay