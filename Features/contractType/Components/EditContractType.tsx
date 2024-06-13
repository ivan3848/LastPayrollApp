import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useEditContractTypeQuery from "../Hooks/useEditContractTypeQuery";
import { IContractType } from "../Types/IContractType";
import contractTypeFormSchemas from "../Validations/ContractTypeFormSchemas";

interface Props {
    entity: IContractType;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditContractType = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = contractTypeFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<IContractType>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useEditContractTypeQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IContractType) => {
        data.idContractType = entity.idContractType;
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
            header="Editar Tipo De Contrato"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="description" className="w-full">
                        Tipo de contrato
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

export default EditContractType;
