import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useEditToolWorkDefinitionEmployeeQuery from "../Hooks/useEditToolWorkDefinitionEmployeeQuery";
import { IToolWorkDefinitionEmployee } from "../Types/IToolWorkDefinitionEmployee";
import ToolWorkDefinitionEmployeeFormSchemas from "../Validations/ToolWorkDefinitionEmployeeFormSchemas";

interface Props {
    entity: IToolWorkDefinitionEmployee;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditToolWorkDefinitionEmployee = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = ToolWorkDefinitionEmployeeFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<IToolWorkDefinitionEmployee>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useEditToolWorkDefinitionEmployeeQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IToolWorkDefinitionEmployee) => {
        data.idToolWorkDefinitionEmployee = entity.idToolWorkDefinitionEmployee;
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
                <div className="field">
                    <label htmlFor="description" className="w-full">
                        Herramienta
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
                {/* <div className="field">
                    <label htmlFor="code" className="w-full">
                        Código
                    </label>
                    <InputText
                        {...register("code")}
                        id="code"
                        autoFocus
                        defaultValue={entity?.code}
                        className={classNames({
                            "p-invalid": errors.code,
                        })}
                    />
                    {errors.code && (
                        <small className="p-invalid text-danger">
                            {errors.code.message?.toString()}
                        </small>
                    )}
                </div>
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
                </div> */}
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditToolWorkDefinitionEmployee;
