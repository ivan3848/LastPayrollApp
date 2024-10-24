import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import useBankQuery from "@/Features/bank/Hooks/useBankQuery";
import { IBankEmployeeHistory } from "./types/IBankEmployeeHistory";
import editBankEmployeeHistory from "./Validation/BankEmployeeHistoryFormSchema";
import { InputText } from "primereact/inputtext";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import { TABLE_NAME_BANK_PAYMENT_METHOD } from "@/constants/StatusTableName";
import GenericCheckBox from "@/Features/Shared/Components/GenericCheckBox";
import { Dialog } from "primereact/dialog";
import useEditBankEmployeeHistoryQuery from "./Hooks/useEditBankEmployeeHistoryQuery";

interface Props {
    entity: IBankEmployeeHistory;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditBankEmployeeHistory = ({
    entity,
    setEditEntityDialog,
    setSubmitted,
    toast,
    editEntityDialog,
}: Props) => {
    const { editEntityFormSchema } = editBankEmployeeHistory();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IBankEmployeeHistory>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useEditBankEmployeeHistoryQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });
    useEffect(() => {
        if (entity) {
            Object.keys(entity).forEach((key) => {
                if (key === "startDate" || key === "endDate") {
                    setValue(
                        key as keyof IBankEmployeeHistory,
                        new Date(
                            entity[key as keyof IBankEmployeeHistory] as Date
                        )
                    );
                    return;
                }
                setValue(
                    key as keyof IBankEmployeeHistory,
                    entity[key as keyof IBankEmployeeHistory]
                );
            });
        }
    }, [setValue]);

    const onSubmit = (data: IBankEmployeeHistory) => {
        data.idBank = data.idBank;
        data.accountNumber = data.accountNumber;
        data.startDate = data!.startDate!;
        data.endDate = data!.endDate!;
        data.idEmployee = entity.idEmployee;
        data.idBankEmployeeHistory = entity.idBankEmployeeHistory;
        data.isDeposit = data.isDeposit;
        data.idStatusAccountType = data.idStatusAccountType;
        editEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    return (
        <Dialog
            visible={editEntityDialog}
            header="Editar Banco al empleado"
            modal
            style={{
                width: "50vw",
                overflow: "hidden",
                maxHeight: "80vh",
                position: "relative",
            }}
            onHide={hideDialog}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            >
                <div className="field col-12 md:col-3">
                    <label htmlFor="idBank" className="block mb-1">
                        Banco
                    </label>
                    <GenericDropDown
                        id="idBank"
                        isValid={!!errors.idBank}
                        text="name"
                        idValueEdit={entity.idBank}
                        useQuery={useBankQuery}
                        setValue={setValue}
                        watch={watch}
                    />
                    {errors.idBank && (
                        <small className="text-red-600">
                            {errors.idBank.message?.toString()}
                        </small>
                    )}
                    <label htmlFor="idStatusAccountType" className="block mb-1">
                        Método de pago
                    </label>
                    <GenericStatusDropDown
                        id="idStatusAccountType"
                        isValid={!!errors.idStatusAccountType}
                        setValue={setValue}
                        watch={watch}
                        tableName={TABLE_NAME_BANK_PAYMENT_METHOD}
                        idValueEdit={entity.idStatusAccountType}
                    />
                    {errors.idStatusAccountType && (
                        <small className="text-red-600">
                            {errors.idStatusAccountType.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="field col-12 md:col-3">
                    <label htmlFor="startDate">Fecha De Inicio</label>
                    <Calendar
                        id="startDate"
                        value={watch("startDate") || entity.startDate}
                        onChange={(e) => setValue("startDate", e.value!)}
                        showIcon
                        showButtonBar
                        key={entity?.startDate?.toString()}
                    />

                    {errors.startDate && (
                        <small className="p-invalid text-red-500">
                            {errors.startDate.message?.toString()}
                        </small>
                    )}

                    <label htmlFor="endDate">Fecha final</label>
                    <Calendar
                        id="endDate"
                        value={new Date(entity.endDate?.toString()!)}
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

                <div className="field col-12 md:col-3 ">
                    <label htmlFor="accountNumber" className="block mb-1">
                        Numero de cuenta
                    </label>
                    <InputText
                        {...register("accountNumber")}
                        id="accountNumber"
                        autoFocus
                        defaultValue={entity?.accountNumber}
                    />
                    {errors.accountNumber && (
                        <p className="text-red-600">
                            {errors.accountNumber.message?.toString()}
                        </p>
                    )}

                    <div>
                        <div className="field-checkbox mt-5">
                            <GenericCheckBox
                                id="isDeposit"
                                text={"Para deposito"}
                                watch={watch}
                                setValue={setValue}
                            />
                        </div>

                        {errors.isDeposit && (
                            <small className="text-red-600">
                                {errors.isDeposit.message?.toString()}
                            </small>
                        )}
                    </div>
                </div>

                <div style={{ position: "absolute", bottom: 3, width: "80%" }}>
                    <DialogFooterButtons hideDialog={hideDialog} />
                </div>
            </form>
        </Dialog>
    );
};

export default EditBankEmployeeHistory;
