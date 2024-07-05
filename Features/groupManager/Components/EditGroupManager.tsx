import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import useEditEntityQuery from "@/Features/Shared/Hooks/useEditEntityQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import groupManagerService from "../Services/groupManagerService";
import { IGroupManager } from "../Types/IGroupManager";
import groupManagerFormSchemas from "../Validations/GroupManagerFormSchemas";

interface Props {
    entity: IGroupManager;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditGroupManager = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = groupManagerFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<IGroupManager>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useEditEntityQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
        service: groupManagerService,
    });

    const onSubmit = (data: IGroupManager) => {
        data.idGroupManager = entity.idGroupManager;
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
            header="Editar Grupo"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="name" className="w-full">
                        Grupo
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
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditGroupManager;
