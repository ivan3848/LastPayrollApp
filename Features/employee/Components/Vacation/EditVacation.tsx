import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import VacationFormSchema from "./Validation/VacationFormSchema";
import useEditVacation from "./Hooks/useEditVacation";
import { calculateVacationDayService } from "./Services/vacationService";
import { InputSwitch } from "primereact/inputswitch";

interface Props {
    entity: IVacation;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditVacation = ({
    entity,
    setEditEntityDialog,
    setSubmitted,
    toast,
    editEntityDialog,
}: Props) => {
    const service = calculateVacationDayService;
    const { editEntityFormSchema } = VacationFormSchema();
    const [vacationData, setVacationData] = useState<ICalculateVacationDaysResult>();
    const [paid, setPaid] = useState(entity.paid!);

    const calculateVacationdays = async (entity: ICalculateVacationDays) => {
        try {
            const data = await service.post(entity!) as ICalculateVacationDaysResult;

            if (data.excepcion != null) {
                toast.current.show({
                    severity: "warn",
                    summary: "Advertencia!",
                    detail: data.excepcion,
                });
                return;
            }
            setVacationData(data);
        } catch (error: any) {
            toast.current.show({
                severity: "warn",
                summary: "Advertencia!",
                detail: error.response.data,
            });
        }
    };

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IVacation>({
        resolver: zodResolver(editEntityFormSchema),
        defaultValues: entity,
    });

    const editEntity = useEditVacation({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    useEffect(() => {
        if (entity) {
            Object.keys(entity).forEach((key) => {
                if (key === "start" || key === "end" || key === "payrollPayDate") {
                    setValue(
                        key as keyof IVacation,
                        new Date(entity[key as keyof IVacation] as Date)
                    );
                    return;
                }
                setValue(
                    key as keyof IVacation,
                    entity[key as keyof IVacation]
                );
            });
        }
    }, [entity, setEditEntityDialog]);

    const onSubmit = (data: IVacation) => {
        data.idVacation = entity.idVacation;
        data.idEmployee = entity.idEmployee;
        data.end = data.end;
        data.start = data.start;
        data.paid = paid;
        data.totalRemain = data.totalRemain;
        data.enjoymentDay = data.enjoymentDay;
        data.reEntryDate = data.end;
        data.payrollPayDate = data.start;
        data.absenteeism = data.absenteeism;
        data.dayPay = data.dayPay;

        editEntity.mutate(data);
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "50vw" }}
            header="Editar Vacaciones"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="start">Fecha De incio</label>
                            <Calendar
                                id="start"
                                {...register("start")}
                                value={watch("start") ?? new Date(entity.start)}
                                onChange={(e) => setValue("start", new Date(e.value!))}
                                key={entity.start.toString()}
                                showIcon
                            />
                            {errors.start && (
                                <small className="p-invalid text-red-500">
                                    {errors.start.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="end">Fecha Final</label>
                            <Calendar
                                id="end"
                                {...register("end")}
                                value={watch("end") ?? new Date(entity.end)}
                                onChange={(e) => {
                                    setValue("end", new Date(e.value!))
                                    const startDate = new Date(watch("start"));
                                    const endDate = new Date(e.value!);

                                    if (startDate && endDate) {
                                        const data = {
                                            idVacation: entity.idVacation,
                                            idEmployee: entity.idEmployee,
                                            from: startDate,
                                            to: endDate,
                                        };
                                        data && calculateVacationdays(data);
                                    }
                                }}
                                key={entity.end.toString()}
                                showIcon
                            />
                            {errors.end && (
                                <small className="p-invalid text-red-500">
                                    {errors.end.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="absenteeism" className="block mb-2">
                                Dias de absentismo
                            </label>
                            <GenericInputNumber
                                id="absenteeism"
                                isValid={!!errors.absenteeism}
                                setValue={setValue}
                                watch={watch}
                                isReadOnly={true}
                                prefix="Dias: "
                                currentValue={vacationData?.absenteeismDays ?? entity.absenteeism}
                            />
                            {errors.absenteeism && (
                                <small className="text-red-600">
                                    {errors.absenteeism.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="dayPay" className="block mb-2">
                                Dias a pagar
                            </label>
                            <GenericInputNumber
                                id="dayPay"
                                isValid={!!errors.dayPay}
                                setValue={setValue}
                                watch={watch}
                                isReadOnly={true}
                                prefix="Dias: "
                                currentValue={entity.dayPay}
                            />
                            {errors.dayPay && (
                                <small className="text-red-600">
                                    {errors.dayPay.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="enjoymentDay" className="block mb-2">
                                Dias de disfrute
                            </label>
                            <GenericInputNumber
                                id="enjoymentDay"
                                isValid={!!errors.enjoymentDay}
                                setValue={setValue}
                                watch={watch}
                                isReadOnly={true}
                                prefix="Dias: "
                                currentValue={vacationData?.enjoymentDays ?? entity.enjoymentDay}
                            />
                            {errors.enjoymentDay && (
                                <small className="text-red-600">
                                    {errors.enjoymentDay.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="end">Fecha de pago</label>
                            <Calendar
                                id="end"
                                {...register("payrollPayDate")}
                                value={watch("payrollPayDate") ?? new Date(entity.payrollPayDate!)}
                                onChange={(e) => setValue("payrollPayDate", new Date(e.value!))}
                                key={entity.end.toString()}
                                showIcon
                            />
                            {errors.end && (
                                <small className="p-invalid text-red-500">
                                    {errors.end.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-3">
                            <h6>Para pago</h6>
                            <InputSwitch
                                {...register("paid")}
                                id="paid"
                                defaultChecked={entity.paid}
                                name="paid"
                                checked={paid}
                                onChange={(e) =>
                                    setPaid(e.value ?? false)
                                }
                            />
                        </div>
                    </div>
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
}

export default EditVacation;