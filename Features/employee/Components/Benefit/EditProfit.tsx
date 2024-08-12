import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import ProfitFormSchema from "./Validation/ProfitFormSchema";
import GenericConceptDropDown from "@/Features/Shared/Components/GenericConceptDropDown";
import { CONCEPT_TYPE_BENEFIT } from "@/constants/conceptTypes";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import useEditProfit from "./Hooks/useEditProfit";
import { IProfitInsert } from "./Types/IProfitInsert";

interface Props {
    entity: IProfitInsert;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
    id: number;
}

const EditBankEmployeeHistory = ({
    entity,
    setEditEntityDialog,
    setSubmitted,
    toast,
    editEntityDialog,
    id,
}: Props) => {
    const { editEntityFormSchema } = ProfitFormSchema();

    const {
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IProfitInsert>({
        resolver: zodResolver(editEntityFormSchema),
        defaultValues: entity,
    });

    const editEntity = useEditProfit({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    useEffect(() => {
        if (entity) {
            Object.keys(entity).forEach((key) => {
                if (key === "start" || key === "end") {
                    setValue(
                        key as keyof IProfitInsert,
                        new Date(entity[key as keyof IProfitInsert] as Date)
                    );
                    return;
                }
                setValue(
                    key as keyof IProfitInsert,
                    entity[key as keyof IProfitInsert]
                );
            });
        }
    }, [entity, setEditEntityDialog]);

    const onSubmit = (data: IProfitInsert) => {
        data.idProfit = entity.idProfit;
        data.idEmployee = id;
        data.idConcept = data.idConcept;
        data.amount = data.amount;
        data.end = data.end;
        data.start = data.start;

        editEntity.mutate(data);
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "50vw" }}
            header="Editar Beneficio"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="idConcept">Concepto</label>
                            <GenericConceptDropDown
                                id={"idConcept"}
                                code={CONCEPT_TYPE_BENEFIT}
                                isValid={!!errors.idConcept}
                                idValueEdit={entity.idConcept}
                                watch={watch}
                                setValue={setValue}
                            />
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="amount">Monto</label>
                            <GenericInputNumber
                                id="amount"
                                isValid={!!errors.amount}
                                setValue={setValue}
                                watch={watch}
                                currentValue={entity.amount}
                            />
                            {errors.amount && (
                                <small className="p-invalid text-danger">
                                    {errors.amount.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="start">Fecha De incio</label>
                            <Calendar
                                id="start"
                                value={
                                    watch("start") ?? new Date(entity?.start!)
                                }
                                onChange={(e) => setValue("start", e.value!)}
                                showIcon
                                showButtonBar
                                key={entity?.start.toString()}
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
                                value={watch("end") || entity.end}
                                onChange={(e) => setValue("end", e.value!)}
                                showIcon
                                showButtonBar
                                key={entity?.end?.toString()}
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

export default EditBankEmployeeHistory;
