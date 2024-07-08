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
import editBankEmployeeHistory from "./Validation/BankEmployeeHistoryFormSchema";
import useBankEmployeeHistoryQuery from "./Hooks/useBankEmployeeHistoryQuery";
import { InputText } from "primereact/inputtext";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import { TABLE_NAME_BANK_PAYMENT_METHOD } from "@/constants/StatusTableName";
import { SelectButton } from "primereact/selectbutton";

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
    const [endDate, setEndDate] = useState<Nullable<Date>>(new Date());

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
        data.endDate = endDate?.toISOString();
        data.idEmployee = entity.idEmployee;
        data.idBankEmployeeHistory = entity.idBankEmployeeHistory;
        editEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    const options = [
        { label: "Activo", value: 1 },
        { label: "Inactivo", value: 0 },
    ];
    return (
        <div className="card p-fluid relative">
            <div className="field mb-4">
                <label htmlFor="name" className="text-lg font-semibold">
                    Formulario Para cambios de banco
                </label>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            >
                <div className="form-group">
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
                </div>
                <div className="form-group">
                    <label htmlFor="idStatus" className="block mb-1">
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
                <div className="form-group ">
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
                </div>

                <div className="form-group">
                    <label htmlFor="startDate" className="block mb-1">
                        Fecha de Inicio
                    </label>
                    <Calendar
                        value={start}
                        showIcon
                        onChange={(e) => setStart(e.value)}
                    />
                    {errors.startDate && (
                        <small className="text-red-600">
                            {errors.startDate.message?.toString()}
                        </small>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="endDate" className="block mb-1">
                        Fecha de Final
                    </label>
                    <Calendar
                        id="endDate"
                        value={endDate}
                        showIcon
                        onChange={(e) => setEndDate(e.value)}
                    />
                    {errors.endDate && (
                        <small className="text-red-600">
                            {errors.endDate.message?.toString()}
                        </small>
                    )}
                </div>

                <div className="ml-auto">
                    <DialogFooterButtons hideDialog={hideDialog} />
                </div>
            </form>
        </div>
    );
};

export default EditBankEmployeeHistory;
