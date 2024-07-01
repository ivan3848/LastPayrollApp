import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useEditEmployeeQuery from "@/Features/employee/Hooks/useEditEmployeeQuery";
import { IEmployeeChange } from "@/Features/employee/Types/IEmployeeChange";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import useEmployeeHistory from "@/Features/employee/Hooks/useEmployeeHistoryQuery";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import editEmployeeWSFromSchemas from "../../Validation/editEmployeeWSFromSchemas";
import useBankQuery from "@/Features/bank/Hooks/useBankQuery";
import { IBankEmployeeHistory } from "../../Types/IBankEmployeeHistory";

interface Props {
    entity: IBankEmployeeHistory;

    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditEmployeeWorkScheduler = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = editEmployeeWSFromSchemas();
    const changeType = "Cambio de horario";

    const { params } = useParamFilter();

    const listOfDependencies: boolean[] = [true];
    const { data, isLoading } = useEmployeeHistory(params, listOfDependencies);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const orderByLastDate = data.items.sort((a, b) => {
        return (
            new Date(b.startDate!).getTime() - new Date(a.startDate!).getTime()
        );
    });

    const [start, setStart] = useState<Nullable<Date>>(new Date());

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IEmployeeChange>({
        resolver: zodResolver(editEntityFormSchema),
    });
    const editEntity = useEditEmployeeQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IEmployeeChange) => {
        data.idEmployee = entity.idEmployee!;
        data.idChange = data.idWorkScheduler!;
        data.changeName = changeType;
        data.dateChange = start!;
        editEntity.mutate(data);
        console.log(data);
        return;
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    return (
        <>
            <div className="field">
                <label htmlFor="name" className="w-full">
                    Numero de cuenta actual
                </label>
                <InputText defaultValue={entity.accountNumber!} disabled />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field col-12 md:col-3">
                    <label htmlFor="idBan</form>k" className="w-full">
                        Banco
                    </label>
                    <GenericDropDown
                        id="idBank"
                        isValid={!!errors.idChange}
                        text="name"
                        idValueEdit={entity.idBank}
                        useQuery={useBankQuery}
                        setValue={setValue}
                        watch={watch}
                    />
                    {errors.idWorkScheduler && (
                        <small className="p-invalid text-danger">
                            {errors.idWorkScheduler.message?.toString()}
                        </small>
                    )}

                    <label htmlFor="idBan</form>k" className="w-full">
                        Banco
                    </label>
                    <GenericDropDown
                        id="idBank"
                        isValid={!!errors.idChange}
                        text="name"
                        idValueEdit={entity.idBank}
                        useQuery={useBankQuery}
                        setValue={setValue}
                        watch={watch}
                    />
                    {errors.idWorkScheduler && (
                        <small className="p-invalid text-danger">
                            {errors.idWorkScheduler.message?.toString()}
                        </small>
                    )}
                    <div>
                        <label htmlFor="buttondisplay" className=" block m-1">
                            Fecha de Inicio
                        </label>
                        <Calendar
                            id="buttondisplay"
                            value={start}
                            showIcon
                            onChange={(e) => setStart(e.value)}
                        />
                        {errors.dateChange && (
                            <small className="p-invalid text-danger">
                                {errors.dateChange.message?.toString()}
                            </small>
                        )}
                    </div>
                </div>

                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </>
    );
};

export default EditEmployeeWorkScheduler;
