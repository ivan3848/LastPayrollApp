import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import useEditWorkSchedulerSubstitute from "./Hooks/useEditWorkSchedulerSubstitute";
import WorkSchedulerSubstituteFormSchema from "./Validation/WorkSchedulerSubstituteFormSchema";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import useWorkSchedulerQuery from "@/Features/workScheduler/Hooks/useWorkSchedulerQuery";

interface Props {
    entity: IWorkSchedulerSubstitute;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditWorkSchedulerSubstitute = ({
    entity,
    setEditEntityDialog,
    setSubmitted,
    toast,
    editEntityDialog,
}: Props) => {
    const { editEntityFormSchema } = WorkSchedulerSubstituteFormSchema();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IWorkSchedulerSubstitute>({
        resolver: zodResolver(editEntityFormSchema),
        defaultValues: entity,
    });

    const editEntity = useEditWorkSchedulerSubstitute({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    useEffect(() => {
        if (entity) {
            Object.keys(entity).forEach((key) => {
                if (key === "startDate" || key === "endDate") {
                    setValue(
                        key as keyof IWorkSchedulerSubstitute,
                        new Date(entity[key as keyof IWorkSchedulerSubstitute] as Date)
                    );
                    return;
                }
                setValue(
                    key as keyof IWorkSchedulerSubstitute,
                    entity[key as keyof IWorkSchedulerSubstitute]
                );
            });
        }
    }, [entity, setEditEntityDialog]);

    const onSubmit = (data: IWorkSchedulerSubstitute) => {
        data.idWorkSchedulerSubstitute = entity.idWorkSchedulerSubstitute;
        data.idEmployee = entity.idEmployee;
        data.idEmployeeAuthorize = entity.idEmployee;
        data.idWorkScheduler = data.idWorkScheduler;
        data.description = data.description;
        data.startDate = data.startDate;
        data.endDate = data.endDate;

        editEntity.mutate(data);
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "50vw" }}
            header="Agregar Suplencia"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="idWorkScheduler">Horario</label>
                            <GenericDropDown
                                id="idWorkScheduler"
                                isValid={!!errors.idWorkScheduler}
                                setValue={setValue}
                                watch={watch}
                                text="name"
                                useQuery={useWorkSchedulerQuery}
                            />
                            {errors.idWorkScheduler && (
                                <small className="p-invalid text-red-500">
                                    {errors.idWorkScheduler.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="startDate">Fecha De incio</label>
                            <Calendar
                                id="startDate"
                                {...register("startDate")}
                                value={watch("startDate") ?? new Date(entity.startDate)}
                                onChange={(e) => setValue("startDate", new Date(e.value!))}
                                showIcon
                                key={entity.startDate.toString()}

                            />
                            {errors.startDate && (
                                <small className="p-invalid text-red-500">
                                    {errors.startDate.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="endDate">Fecha De incio</label>
                            <Calendar
                                id="endDate"
                                {...register("endDate")}
                                value={watch("endDate") ?? new Date(entity.endDate)}
                                onChange={(e) => setValue("endDate", new Date(e.value!))}
                                showIcon
                                key={entity.endDate.toString()}

                            />
                            {errors.endDate && (
                                <small className="p-invalid text-red-500">
                                    {errors.endDate.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-12 lg:4">
                            <label htmlFor="description">Descripción</label>
                            <InputText
                                id="description"
                                type="text"
                                {...register("description")}
                            />
                            {errors.description && (
                                <small className="p-invalid text-red-500">
                                    {errors.description.message?.toString()}
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

export default EditWorkSchedulerSubstitute;
