import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IEmployee } from "../../employee/Types/IEmployee";
import useEditEmployeeQuery from "@/Features/employee/Hooks/useEditEmployeeQuery";
import { IEmployeeChange } from "@/Features/employee/Types/IEmployeeChange";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import GenericFieldValue from "@/Features/Shared/Components/GenericFieldValue";
import useEmployeeHistory from "@/Features/employee/Hooks/useEmployeeHistoryQuery";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import workSchedulerFormSchemas from "@/Features/workScheduler/Validations/WorkSchedulerFormSchemas";
import useWorkSchedulerQuery from "@/Features/workScheduler/Hooks/useWorkSchedulerQuery";

interface Props {
    entity: IEmployee;

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
    const { editEntityFormSchema } = workSchedulerFormSchemas();

    const { params } = useParamFilter();

    const listOfDependencies: boolean[] = [true];
    const { data, isLoading } = useEmployeeHistory(params, listOfDependencies);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    console.log(data.items);

    const orderByLastDate = data.items.sort((a, b) => {
        return (
            new Date(b.startDate!).getTime() - new Date(a.startDate!).getTime()
        );
    });
    console.log(orderByLastDate);

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
    const changeType = "Cambio de horario";
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
        <Dialog
            visible={editEntityDialog}
            style={{ width: "450px" }}
            header="Editar Horario"
            className="p-fluid"
            onHide={hideDialog}
        >
            <div className="field">
                <label htmlFor="name" className="w-full">
                    Horario Actual
                </label>
                <InputText defaultValue={entity.workSchedulerName!} disabled />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="idWorkScheduler" className="w-full">
                        Nuevo Horario
                    </label>
                    <GenericDropDown
                        id="idWorkScheduler"
                        isValid={!!errors.idChange}
                        text="name"
                        idValueEdit={entity.idWorkScheduler}
                        useQuery={useWorkSchedulerQuery}
                        setValue={setValue}
                        watch={watch}
                    />
                    {errors.idChange && (
                        <small className="p-invalid text-danger">
                            {errors.idChange.message?.toString()}
                        </small>
                    )}

                    <div className="flex-auto">
                        <label htmlFor="buttondisplay" className=" block m-1">
                            Fecha de cambio
                        </label>
                        <Calendar
                            id="buttondisplay"
                            value={start}
                            showIcon
                            onChange={(e) => setStart(e.value)}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="reason" className="w-full">
                            Cambios pendientes
                        </label>
                        <GenericFieldValue valueOrDefault={""} />
                    </div>
                </div>

                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditEmployeeWorkScheduler;
