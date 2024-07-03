import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useEditEmployeeQuery from "@/Features/employee/Hooks/useEditEmployeeQuery";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import useBankQuery from "@/Features/bank/Hooks/useBankQuery";
import { IBankEmployeeHistory } from "./types/IBankEmployeeHistory";
import editBankEmployeeHistory from "./Validation/editBankEmployeeHistory";
import useBankEmployeeHistoryQuery from "./Hooks/useBankEmployeeHistoryQuery";
import { InputText } from "primereact/inputtext";

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
}: Props) => {
    const { editEntityFormSchema } = editBankEmployeeHistory();
    const changeType = "Cambio de horario";

    const { params } = useParamFilter();

    const listOfDependencies: boolean[] = [true];
    const { data, isLoading } = useBankEmployeeHistoryQuery(
        params,
        listOfDependencies
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const [start, setStart] = useState<Nullable<Date>>(new Date());

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
    const editEntity = useEditEmployeeQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IBankEmployeeHistory) => {
        console.log(data);
        data.idBank = data.idBank;
        data.accountNumber = data.accountNumber;
        data.startDate = start?.toISOString();
        data.endDate = start?.toISOString();
        data.idEmployee = entity.idEmployee;
        data.idBankEmployeeHistory = entity.idBankEmployeeHistory;
        data.paymentMethod = data.paymentMethod;
        editEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    const paymentOptions = [
        { value: "direct deposit", label: "Direct Deposit" },
        { value: "check", label: "Check" },
        { value: "cash", label: "Cash" },
    ];

    return (
        <div className="edit-bank-employee-history">
            <div className="field">
                <label htmlFor="name" className="w-full">
                    Formulario Para cambios de banco
                </label>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div
                    className="p-fluid grid form-grid"
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        width: "100%",
                        padding: "0 1rem",
                        margin: "1rem",
                    }}
                >
                    <div className="form-group">
                        <label htmlFor="idBank" className="w-full">
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
                            <small className="p-invalid text-danger">
                                {errors.idBank.message?.toString()}
                            </small>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="accountNumber" className="w-full">
                            Numero de cuenta
                        </label>
                        <InputText
                            {...register("accountNumber")}
                            id="accountNumber"
                            autoFocus
                            defaultValue={entity?.accountNumber}
                        />
                        {errors.accountNumber && (
                            <small className="p-invalid text-danger">
                                {errors.accountNumber.message?.toString()}
                            </small>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="buttondisplay">Fecha de Inicio</label>
                        <Calendar
                            value={start}
                            showIcon
                            onChange={(e) => setStart(e.value)}
                        />
                        {errors.startDate && (
                            <small className="p-invalid text-danger">
                                {errors.startDate.message?.toString()}
                            </small>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="buttondisplay">Fecha de Final</label>
                        <Calendar
                            id="buttondisplay"
                            value={start}
                            showIcon
                            onChange={(e) => setStart(e.value)}
                        />
                        {errors.endDate && (
                            <small className="p-invalid text-danger">
                                {errors.endDate.message?.toString()}
                            </small>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="paymentMethod">Método de Pago</label>
                        <select
                            {...register("paymentMethod")}
                            id="paymentMethod"
                            className="w-full p-inputtext p-component p-filled p-inputtext-filled p-dropdown"
                        >
                            {paymentOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="isActive">Método de Pago</label>
                        <select
                            {...register("isActive")}
                            id="isActive"
                            className="w-full p-inputtext p-component p-filled p-inputtext-filled p-dropdown"
                        >
                            <option value={"0"}>Activo</option>
                            <option value={"1"}>Inactivo</option>
                        </select>
                    </div>
                </div>

                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </div>
    );
};

export default EditBankEmployeeHistory;
