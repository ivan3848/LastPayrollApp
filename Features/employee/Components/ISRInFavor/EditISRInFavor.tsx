import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { IISRInFavor } from "./Types/ISRInFavor";
import ISRInFavorFormSchema from "./Validations/ISRInFavorFormSchema";
import useEditISRInFavor from "./Hooks/useEditISRInFavor";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import { InputText } from "primereact/inputtext";

interface Props {
    entity: IISRInFavor;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
    id: number;
}

const EditISRInFavor = ({
    entity,
    setEditEntityDialog,
    setSubmitted,
    toast,
    editEntityDialog,
    id,
}: Props) => {
    const { editEntityFormSchema } = ISRInFavorFormSchema();

    const {
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IISRInFavor>({
        resolver: zodResolver(editEntityFormSchema),
        defaultValues: entity,
    });
    const editEntity = useEditISRInFavor({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    useEffect(() => {
        if (entity) {
            Object.keys(entity).forEach((key) => {
                if (key === "date") {
                    setValue(
                        key as keyof IISRInFavor,
                        new Date(entity[key as keyof IISRInFavor] as Date)
                    );
                    return;
                }
                setValue(
                    key as keyof IISRInFavor,
                    entity[key as keyof IISRInFavor]
                );
            });
        }
    }, [entity, setEditEntityDialog]);

    const onSubmit = (data: IISRInFavor) => {
        data.idEmployee = id;
        data.idIsrInFavor = entity.idIsrInFavor;
        data.idConcept = 17;
        data.date = data.date;
        data.isrInFavorDetail = entity.isrInFavorDetail;
        console.log(data);
        editEntity.mutate(data);
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "50vw" }}
            header="Editar Isr A Favor"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="idConcept">Concepto</label>
                            <InputText
                                id="idConcept"
                                readOnly
                                value={entity?.conceptName}
                                disabled
                            />
                        </div>

                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="originalAmount">
                                Monto Original
                            </label>
                            <GenericInputNumber
                                id="originalAmount"
                                isValid={!!errors.originalAmount}
                                setValue={setValue}
                                watch={watch}
                                currentValue={entity.originalAmount}
                            />
                            {errors.originalAmount && (
                                <small className="p-invalid text-danger">
                                    {errors.originalAmount.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="start">Fecha</label>
                            <Calendar
                                id="date"
                                value={watch("date") ?? new Date(entity?.date!)}
                                onChange={(e) => setValue("date", e.value!)}
                                showIcon
                                showButtonBar
                                key={entity?.date.toString()}
                            />

                            {errors.date && (
                                <small className="p-invalid text-red-500">
                                    {errors.date.message?.toString()}
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

export default EditISRInFavor;
