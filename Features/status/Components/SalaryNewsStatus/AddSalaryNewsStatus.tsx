import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useAddStatusQuery from "../../Hooks/useAddStatusQuery";
import { IStatus } from "../../Types/IStatus";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import statusFormSchemas from "../../Validations/StatusFormSchemas";
import { TABLE_NAME_SALARY_NEWS } from "@/constants/StatusTableName";

interface Props {
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddSalaryNewsStatus = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { addEntityFormSchema } = statusFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<IStatus>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddStatusQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IStatus) => {
        data.tableName = TABLE_NAME_SALARY_NEWS;
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
            header="Agregar Novedades Salariales"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="description" className="w-full">
                        Novedad Salarial
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

export default AddSalaryNewsStatus;
