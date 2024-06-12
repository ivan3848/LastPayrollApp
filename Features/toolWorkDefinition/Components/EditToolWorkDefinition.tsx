import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useEditToolWorkDefinitionQuery from "../Hooks/useEditToolWorkDefinitionQuery";
import { IToolWorkDefinition } from "../Types/IToolWorkDefinition";
import toolWorkDefinitionFormSchemas from "../Validations/ToolWorkDefinitionFormSchemas";

interface Props {
    entity: IToolWorkDefinition;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditToolWorkDefinition = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = toolWorkDefinitionFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<IToolWorkDefinition>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useEditToolWorkDefinitionQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IToolWorkDefinition) => {
        data.idToolWorkDefinition = entity.idToolWorkDefinition;
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
                    <label htmlFor="name" className="w-full">
                        Herramienta
                    </label>
                    <InputText
                        {...register("name")}
                        id="name"
                        autoFocus
                        defaultValue={entity?.name}
                        className={classNames({
                            "p-invalid": errors.name,
                        })}
                    />
                    {errors.name && (
                        <small className="p-invalid text-danger">
                            {errors.name.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="field">
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
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditToolWorkDefinition;
