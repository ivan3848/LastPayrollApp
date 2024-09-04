import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useEditLeasePause from "./Hooks/useEditLeasePause";
import LeasePauseFormSchema from "./Validation/LeasePauseFormSchema";

interface Props {
    entity: ILeasePause;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditLeasePause = ({
    entity,
    setEditEntityDialog,
    setSubmitted,
    toast,
    editEntityDialog,
}: Props) => {
    const { editEntityFormSchema } = LeasePauseFormSchema();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ILeasePause>({
        resolver: zodResolver(editEntityFormSchema),
        defaultValues: entity,
    });

    const editEntity = useEditLeasePause({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    useEffect(() => {
        if (entity) {
            Object.keys(entity).forEach((key) => {
                if (key === "startPauseDate" || key === "endPauseDate") {
                    setValue(
                        key as keyof ILeasePause,
                        new Date(entity[key as keyof ILeasePause] as Date)
                    );
                    return;
                }
                setValue(
                    key as keyof ILeasePause,
                    entity[key as keyof ILeasePause]
                );
            });
        }
    }, [entity, setEditEntityDialog]);

    const onSubmit = (data: ILeasePause) => {
        editEntity.mutate(data);
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "90vw" }}
            header="Editar préstamo"
            modal
            maximizable
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="startDate">Desde</label>
                            <Calendar
                                id="startPauseDate"
                                {...register("startPauseDate")}
                                value={
                                    watch("startPauseDate") ??
                                    new Date(entity.startPauseDate!)
                                }
                                onChange={(e) =>
                                    setValue(
                                        "startPauseDate",
                                        new Date(e.value!)
                                    )
                                }
                                showIcon
                                key={entity.startPauseDate?.toString()}
                            />
                            {errors.startPauseDate && (
                                <small className="p-invalid text-red-500">
                                    {errors.startPauseDate.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="field col-12 md:col-6">
                            <label htmlFor="endPauseDate">Hasta</label>
                            <Calendar
                                id="endPauseDate"
                                {...register("endPauseDate")}
                                value={
                                    watch("endPauseDate") ??
                                    new Date(entity.endPauseDate!)
                                }
                                onChange={(e) =>
                                    setValue("endPauseDate", new Date(e.value!))
                                }
                                showIcon
                                key={entity.endPauseDate?.toString()}
                            />
                            {errors.endPauseDate && (
                                <small className="p-invalid text-red-500">
                                    {errors.endPauseDate.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="field col-12 md:col-6">
                            <label htmlFor="description">Descripción</label>
                            <InputTextarea
                                {...register("description")}
                                id="description"
                                value={
                                    watch("description") ?? entity.description
                                }
                                className="p-inputtext p-component"
                                placeholder="Ingrese una descripción"
                                rows={5}
                                cols={30}
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

export default EditLeasePause;
