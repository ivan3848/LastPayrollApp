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
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import useToolWorkDefinitionQuery from "@/Features/toolWorkDefinition/Hooks/useToolWorkDefinitionQuery";
import { Calendar } from "primereact/calendar";

interface Props {
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
    idEmployee?: number;
}

const AddToolWorkDefinitionEmployee = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
    idEmployee,
}: Props) => {
    const { addEntityFormSchema } = ToolWorkDefinitionEmployeeFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
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
        data.idEmployee = idEmployee!;
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
                    />
                    {errors.idToolWorkDefinition && (
                        <small className="p-invalid text-danger">
                            {errors.idToolWorkDefinition.message?.toString()}
                        </small>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="assignationDate">Fecha de asignación</label>
                    <Calendar
                        id="assignationDate"
                        value={watch("assignationDate") ?? new Date()}
                        onChange={(e) => setValue("assignationDate", e.value!)}
                        showIcon
                        showButtonBar
                    />
                    {errors.assignationDate && (
                        <small className="p-invalid text-red-500">
                            {errors.assignationDate.message?.toString()}
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

export default AddToolWorkDefinitionEmployee;
