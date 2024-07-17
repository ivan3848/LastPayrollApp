import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import { IToolWorkDefinitionEmployee } from "../Types/IToolWorkDefinitionEmployee";
import ToolWorkDefinitionEmployeeFormSchemas from "../Validations/ToolWorkDefinitionEmployeeFormSchemas";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import useAddToolWorkDefinitionEmployeeQuery from "../Hooks/useAddTookWorkDefinitionEmployeeQuery";

interface Props {
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddToolWorkDefinitionEmployee = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { addEntityFormSchema } = ToolWorkDefinitionEmployeeFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<IToolWorkDefinitionEmployee>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddToolWorkDefinitionEmployeeQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IToolWorkDefinitionEmployee) => {
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
                    <label htmlFor="description" className="w-full">
                        Herramienta
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
                {/* <div className="field">
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
                </div> */}
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default AddToolWorkDefinitionEmployee;
