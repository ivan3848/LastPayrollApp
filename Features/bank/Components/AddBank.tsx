import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import { useStatusByTableNameQuery } from "@/Features/status/Hooks/useStatusQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useAddBankQuery from "../Hooks/useAddBankQuery";
import { IBank } from "../Types/IBank";
import bankFormSchemas from "../Validations/BankFormSchemas";

interface Props {
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddBank = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { addEntityFormSchema } = bankFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IBank>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddBankQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IBank) => {
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
            header="Agregar Banco"
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
                        isFocus={true}
                        tableName="BankPaymentMethod"
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

export default AddBank;
