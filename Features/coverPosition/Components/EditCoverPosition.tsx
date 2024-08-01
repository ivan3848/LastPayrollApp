import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useEditCoverPositionQuery from "../Hooks/useEditCoverPositionQuery";
import { ICoverPosition } from "../Types/ICoverPosition";
import CoverPositionFormSchemas from "../Validations/CoverPositionFormSchemas";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import { Calendar } from "primereact/calendar";
import useToolWorkDefinitionQuery from "@/Features/toolWorkDefinition/Hooks/useToolWorkDefinitionQuery";
import { Nullable } from "primereact/ts-helpers";

interface Props {
    entity: ICoverPosition;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
    idEmployee: number;
}

const EditCoverPosition = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
    idEmployee,
}: Props) => {
    const { editEntityFormSchema } = CoverPositionFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ICoverPosition>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useEditCoverPositionQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const dateToEdit = new Date(entity.description?.toString()!);

    const onSubmit = (data: ICoverPosition) => {
        data.idCoverPosition = entity.idCoverPosition;
        data.idEmployee = idEmployee!;
        editEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "450px" }}
            header="Editar Herramienta De Trabajo"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <div className="field">
                    <label htmlFor="idToolWorkDefinition" className="w-full">
                        Herramienta
                    </label>
                    <GenericDropDown
                        id="idToolWorkDefinition"
                        isValid={!!errors.idToolWorkDefinition}
                        text="name"
                        useQuery={useToolWorkDefinitionQuery}
                        setValue={setValue}
                        watch={watch}
                        idValueEdit={entity.idToolWorkDefinition}
                    />
                    {errors.idToolWorkDefinition && (
                        <small className="p-invalid text-danger">
                            {errors.idToolWorkDefinition.message?.toString()}
                        </small>
                    )}
                </div> */}

                {/* <div className="field">
                    <label htmlFor="assignationDate">Fecha de Asignación</label>
                    <Calendar
                        id="assignationDate"
                        value={dateToEdit && dateToEdit}
                        onChange={(e) => setValue("assignationDate", e.value!)}
                        onFocus={() => setValue("assignationDate", dateToEdit)}
                        autoFocus
                        showIcon
                        showButtonBar
                    />
                    {errors.assignationDate && (
                        <small className="p-invalid text-red-500">
                            {errors.assignationDate.message?.toString()}
                        </small>
                    )}
                </div> */}

                <div className="field">
                    <label htmlFor="description" className="w-full">
                        Descripción
                    </label>
                    <InputText
                        {...register("description")}
                        id="description"
                        autoFocus
                        defaultValue={entity?.description}
                        className={classNames({
                            "p-invalid": errors.description,
                        })}
                    />
                    {errors.description && (
                        <small className="p-invalid text-danger">
                            {errors.description.message?.toString()}
                        </small>
                    )}
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditCoverPosition;
