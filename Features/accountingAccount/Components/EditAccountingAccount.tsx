import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useEditAccountingAccountQuery from "../Hooks/useEditAccountingAccountQuery";
import { IAccountingAccount } from "../Types/IAccountingAccount";
import accountingAccountFormSchemas from "../Validations/AccountingAccountFormSchemas";

interface Props {
    entity: IAccountingAccount;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditAccountingAccount = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = accountingAccountFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<IAccountingAccount>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useEditAccountingAccountQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IAccountingAccount) => {
        data.idAccountingAccount = entity.idAccountingAccount;
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
            header="Editar Cuenta Contable"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="name" className="w-full">
                        Cuenta
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
                    <label htmlFor="accountNumber" className="w-full">
                        Número de cuenta
                    </label>
                    <InputText
                        {...register("accountNumber")}
                        id="accountNumber"
                        autoFocus
                        defaultValue={entity?.accountNumber}
                        className={classNames({
                            "p-invalid": errors.accountNumber,
                        })}
                    />
                    {errors.accountNumber && (
                        <small className="p-invalid text-danger">
                            {errors.accountNumber.message?.toString()}
                        </small>
                    )}
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditAccountingAccount;
