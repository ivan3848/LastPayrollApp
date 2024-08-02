import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import { IToolWorkDefinition } from "../Types/IToolWorkDefinition";
import toolWorkDefinitionFormSchemas from "../Validations/ToolWorkDefinitionFormSchemas";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import useAddToolWorkDefinitionQuery from "../Hooks/useAddTookWorkDefinitionQuery";

interface Props {
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddToolWorkDefinition = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { addEntityFormSchema } = toolWorkDefinitionFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<IToolWorkDefinition>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddToolWorkDefinitionQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IToolWorkDefinition) => {
        addEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    return (
        <Dialog
            visible={addEntityDialog}
            style={{ width: "450px" }}
            header="Agregar Herramienta De Trabajo"
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

export default AddToolWorkDefinition;
