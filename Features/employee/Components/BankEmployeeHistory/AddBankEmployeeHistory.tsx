import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React from "react";
import { useForm } from "react-hook-form";
import { IBankEmployeeHistory } from "./types/IBankEmployeeHistory";
import useAddBankEmployeeHistory from "./Hooks/useAddBankEmployeeHistory";
import useBankQuery from "@/Features/bank/Hooks/useBankQuery";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import { TABLE_NAME_BANK_PAYMENT_METHOD } from "@/constants/StatusTableName";
import BankEmployeeHistoryFormSchema from "./Validation/BankEmployeeHistoryFormSchema";
import { Calendar } from "primereact/calendar";

interface Props {
    id: number;
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddBankEmployeeHistory = ({
    id,
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { addEntityFormSchema } = BankEmployeeHistoryFormSchema();

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IBankEmployeeHistory>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddBankEmployeeHistory({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IBankEmployeeHistory) => {
        data.idEmployee = id;
        data.startDate = data!.startDate!;
        data.endDate = data!.endDate!;
        data.idStatusAccountType = data!.idStatusAccountType!;
        data.isActive = true;
        addEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    return (
        <Dialog
            visible={addEntityDialog}
            header="Agregar Banco al empleado"
            modal
            style={{ width: "40vw" }}
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="idBank" className="block">
                        Banco
                    </label>
                    <GenericDropDown
                        id="idBank"
                        isValid={!!errors.idBank}
                        text="name"
                        useQuery={useBankQuery}
                        setValue={setValue}
                        watch={watch}
                    />
                    {errors.idBank && (
                        <small className="text-red-600">
                            {errors.idBank.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="accountNumber" className="w-full mt-2">
                        Numero de cuenta
                    </label>
                    <InputText
                        {...register("accountNumber")}
                        id="accountNumber"
                        autoFocus
                    />
                    {errors.accountNumber && (
                        <small className="text-red-600">
                            {errors.accountNumber.message?.toString()}
                        </small>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="idStatusAccountType" className="block mt-1">
                        Método de pago
                    </label>
                    <GenericStatusDropDown
                        id="idStatusAccountType"
                        isValid={!!errors.idStatusAccountType}
                        setValue={setValue}
                        watch={watch}
                        tableName={TABLE_NAME_BANK_PAYMENT_METHOD}
                    />
                    {errors.idStatusAccountType && (
                        <small className="text-red-600">
                            {errors.idStatusAccountType.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="startDate">Fecha De Inicio</label>
                    <Calendar
                        id="startDate"
                        onChange={(e) => setValue("startDate", e.value!)}
                        showIcon
                        showButtonBar
                    />
                    {errors.startDate && (
                        <small className="p-invalid text-red-500">
                            {errors.startDate.message?.toString()}
                        </small>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="endDate">Fecha final</label>

                    <Calendar
                        id="endDate"
                        onChange={(e) => setValue("endDate", e.value!)}
                        showIcon
                        showButtonBar
                    />

                    {errors.endDate && (
                        <small className="p-invalid text-red-500">
                            {errors.endDate.message?.toString()}
                        </small>
                    )}
                </div>

                <div className="mt-2">
                    <DialogFooterButtons hideDialog={hideDialog} />
                </div>
            </form>
        </Dialog>
    );
};

export default AddBankEmployeeHistory;
