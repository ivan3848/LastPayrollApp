import React, { useState } from "react";
import { IEmployee } from "../../../Types/IEmployee";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { useForm } from "react-hook-form";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { InputSwitch } from "primereact/inputswitch";
import FiredEmployeeFormSchema from "../Validation/FiredEmployeeFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import firedEmployeeService from "../Services/firedEmployee";
import useCrudModals from '@/Features/Shared/Hooks/useCrudModals';
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

interface Props {
    employee: IEmployee;
}

const FireEmployee = ({ employee }: Props) => {

    const {
        setSubmitted,
        toast,
    } = useCrudModals<IFireEmployee>();

    const [pagoNavidad, setPagoNavidad] = useState(false);
    const [notice, setNotice] = useState(false);
    const [vacation, setVacation] = useState(false);
    const [unemployment, setUnemployment] = useState(false);

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

    const addEntity = useAddEntityQuery({
        toast,
        setSubmitted,
        reset,
        service: firedEmployeeService,
        message: "Empleado desvinculado correctamente",
    });

    const onFormSubmit = (data: IFireEmployee) => {
        data.idEmployee = employee.idEmployee;
        data.isChristmasPayment = pagoNavidad;
        data.isNotice = notice;
        data.isTakenVacation = vacation;
        data.isUnemployment = unemployment;
        data.firedDate = data.firedDate ?? new Date();
        data.idStatusFired = data.idStatusFired;

        addEntity.mutate(data);
        return;
    };

    return (
        <div className="grid">
            <div className="col-12 mx-auto">
                <div className="card">
                    <Toast ref={toast} />
                    <form onSubmit={handleSubmit(onFormSubmit)}>
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
                                    tableName="CancelationReasonStatus"
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
                                    tableName="CancelationTypeStatus"
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
                                    onChange={(e) => setValue("firedDate", e.value!)}
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
                                    onChange={(e) =>
                                        setPagoNavidad(e.value)
                                    }
                                />
                                <h6>Pre-Aviso</h6>
                                <InputSwitch
                                    {...register("isNotice")}
                                    name="isNotice"
                                    checked={notice}
                                    onChange={(e) =>
                                        setNotice(e.value)
                                    }
                                />
                            </div>
                            <div className="field col-12 md:col-3">
                                <h6>Ha tomado vacaciones este año?</h6>
                                <InputSwitch
                                    {...register("isTakenVacation")}
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
                        <div
                            className="flex justify-content-end mt-3"
                            style={{ width: "30%", gap: "5px", marginLeft: "auto" }}
                        >
                            <Button
                                label="Cancelar"
                                icon="pi pi-times"
                                raised
                                type="button"
                                onClick={() => { }}
                                severity="danger"
                            />
                            <Button label="Guardar" disabled={!employee.isActive} icon="pi pi-check" raised type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FireEmployee;
