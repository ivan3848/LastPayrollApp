import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useEditNationalityQuery from "../Hooks/useEditNationalityQuery";
import { INationality } from "../Types/INationality";
import nationalityFormSchemas from "../Validations/NationalityFormSchemas";

interface Props {
    entity: INationality;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditNationality = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = nationalityFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<INationality>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useEditNationalityQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: INationality) => {
        data.idNationality = entity.idNationality;
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
            header="Editar Nacionalidad"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="name" className="w-full">
                        Nacionalidad
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

export default EditNationality;
