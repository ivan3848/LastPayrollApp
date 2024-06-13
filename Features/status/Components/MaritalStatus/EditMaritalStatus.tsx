import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useEditStatusQuery from "../../Hooks/useEditStatusQuery";
import { IStatus } from "../../Types/IStatus";
import statusFormSchemas from "../../Validations/StatusFormSchemas";

interface Props {
    entity: IStatus;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditMaritalStatus = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = statusFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<IStatus>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useEditStatusQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IStatus) => {
        data.idStatus = entity.idStatus;
        data.tableName = entity.tableName;
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
            header="Editar Estado Civil"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="description" className="w-full">
                        Estado Civil
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

export default EditMaritalStatus;
