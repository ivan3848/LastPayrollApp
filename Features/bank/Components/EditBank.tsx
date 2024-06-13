import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import { useStatusByTableNameQuery } from "@/Features/status/Hooks/useStatusQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useEditBankQuery from "../Hooks/useEditBankQuery";
import { IBank } from "../Types/IBank";
import bankFormSchemas from "../Validations/BankFormSchemas";

interface Props {
    entity: IBank;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditBank = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = bankFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IBank>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useEditBankQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IBank) => {
        data.idBank = entity.idBank;
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
            header="Editar Ciudad"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="idStatus" className="w-full">
                        Método de pago
                    </label>
                    <GenericStatusDropDown
                        id="idStatusAccountType"
                        isValid={!!errors.idStatusAccountType}
                        setValue={setValue}
                        watch={watch}
                        tableName="BankPaymentMethod"
                        idValueEdit={entity.idStatusAccountType}
                    />
                    {errors.idStatusAccountType && (
                        <small className="p-invalid text-danger">
                            {errors.idStatusAccountType.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="bankKey" className="w-full">
                        Clave de banco
                    </label>
                    <InputText
                        {...register("bankKey")}
                        id="bankKey"
                        defaultValue={entity.bankKey}
                        className={classNames({
                            "p-invalid": errors.bankKey,
                        })}
                    />
                    {errors.bankKey && (
                        <small className="p-invalid text-danger">
                            {errors.bankKey.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="name" className="w-full">
                        Banco
                    </label>
                    <InputText
                        {...register("name")}
                        id="name"
                        defaultValue={entity.name}
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
                    <label htmlFor="address" className="w-full">
                        Dirección
                    </label>
                    <InputText
                        {...register("address")}
                        id="address"
                        defaultValue={entity.address}
                        className={classNames({
                            "p-invalid": errors.address,
                        })}
                    />
                    {errors.address && (
                        <small className="p-invalid text-danger">
                            {errors.address.message?.toString()}
                        </small>
                    )}
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditBank;
