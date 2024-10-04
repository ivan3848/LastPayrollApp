import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import VacationFormSchema from "./Validation/VacationFormSchema";
import { addVacationService, calculateVacationDayService } from "./Services/vacationService";
import { useState } from "react";
import { IEmployee } from "../../Types/IEmployee";

interface Props {
    setAddEntityDialog: (value: boolean) => void;
    addEntityDialog: boolean;
    entity: IEmployee;
    handleAdd: () => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddVacation = ({
    setAddEntityDialog,
    addEntityDialog,
    entity,
    toast,
    setSubmitted,
}: Props) => {
    const service = calculateVacationDayService;
    const { addEntityFormSchema } = VacationFormSchema();
    const [vacationData, setVacationData] = useState<ICalculateVacationDaysResult>();

    let employeeTime: number = 14;
    const yearsDifference = new Date().getFullYear() - new Date(entity.startDate).getFullYear();

    if (yearsDifference > 4)
        employeeTime = 18;

    const {
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IVacation>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddEntityQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
        service: addVacationService,
    });

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
                detail: "Error al calcular los dias de vacaciones. Por favor intente nuevamente.",
            });
        }
    };

    const onSubmit = (data: IVacation) => {
        if (!vacationData) return;

        data.idEmployee = entity.idEmployee;
        data.end = data.end;
        data.start = data.start;
        data.paid = data.paid ?? false;
        data.totalRemain = data.totalRemain ?? 2;
        data.enjoymentDay = data.enjoymentDay;
        data.reEntryDate = data.end ?? new Date();
        data.payrollPayDate = data.payrollPayDate;
        data.absenteeism = data.absenteeism ?? 0;
        data.dayPay = data.dayPay ?? 0;

        addEntity.mutate(data);
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    return (
        <Dialog
            visible={addEntityDialog}
            style={{ width: "50vw" }}
            header="Agregar Vacaciones"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="startDateTime">Fecha De incio</label>
                            <Calendar
                                id="start"
                                onChange={(e) => setValue("start", e.value!)}
                                showIcon
                                showButtonBar
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
                                onChange={(e) => {
                                    setValue("end", e.value!);
                                    const startDate = new Date(watch("start"));
                                    const endDate = new Date(e.value!);

                                    if (startDate && endDate) {
                                        const data = {
                                            idEmployee: entity.idEmployee,
                                            from: startDate,
                                            to: endDate,
                                        };
                                        data && calculateVacationdays(data);
                                    }
                                }}
                                showIcon
                                showButtonBar
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
                                currentValue={vacationData && +vacationData.absenteeismDays}
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
                                currentValue={employeeTime}
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
                                currentValue={vacationData && +vacationData.enjoymentDays}
                            />
                            {errors.enjoymentDay && (
                                <small className="text-red-600">
                                    {errors.enjoymentDay.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="payrollPayDate">Fecha de pago</label>
                            <Calendar
                                id="payrollPayDate"
                                onChange={(e) => setValue("payrollPayDate", e.value!)}
                                showIcon
                                showButtonBar
                            />
                            {errors.end && (
                                <small className="p-invalid text-red-500">
                                    {errors.end.message?.toString()}
                                </small>
                            )}
                        </div>
                    </div>
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default AddVacation;
