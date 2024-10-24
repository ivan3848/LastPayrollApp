import { addHours } from "@/Features/Shared/Helpers/DateHelper";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import { IWorkScheduler } from "@/Features/workScheduler/Types/IWorkScheduler";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Nullable } from "primereact/ts-helpers";
import { classNames } from "primereact/utils";
import { useState } from "react";
import workSchedulerDetailService from "../Services/workSchedulerServiceDetail";
import { IWorkSchedulerDetail } from "../Types/IWorkSchedulerDetail";
import EditWorkSchedulerDetailTable from "./EditWorkSchedulerDetailTable";
import SelectDays from "./SelectDays";

interface ErrorState {
    week?: string;
    start?: string;
    end?: string;
    days?: string;
}

interface Props {
    entity: IWorkScheduler;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditWorkSchedulerDetail = ({ entity, toast, setSubmitted }: Props) => {
    const [errors, setErrors] = useState<ErrorState>({});

    const validateForm = () => {
        let formErrors = {};

        if (!week)
            formErrors = { ...formErrors, week: "Este campo es requerido" };
        if (!start)
            formErrors = { ...formErrors, start: "Este campo es requerido" };
        if (!end)
            formErrors = { ...formErrors, end: "Este campo es requerido" };
        if (!days)
            formErrors = { ...formErrors, days: "Seleccione al menos un día" };

        setErrors(formErrors);

        return Object.keys(formErrors).length === 0;
    };

    const [week, setWeek] = useState<number>(1);
    const [days, setDays] = useState<string>();
    const [start, setStart] = useState<Nullable<Date>>(
        new Date("2024-01-01 08:00:00")
    );
    const [end, setEnd] = useState<Nullable<Date>>(
        new Date("2024-01-01 17:00:00")
    );

    const reset = () => {
        setWeek(1);
        setDays("");
        setStart(new Date("2024-01-01 08:00:00"));
        setEnd(new Date("2024-01-01 17:00:00"));
    };

    const addEntity = useAddEntityQuery({
        toast,
        setSubmitted,
        reset,
        service: workSchedulerDetailService,
    });

    const onSubmit = () => {
        if (!validateForm()) return;

        const data: IWorkSchedulerDetail = {
            idWorkScheduler: entity.idWorkScheduler,
            week,
            start: addHours(start!, -4),
            end: addHours(end!, -4),
            days: days!,
        };

        addEntity.mutate(data);

        return;
    };

    return (
        <div className="card">
            <form onSubmit={(e) => e.preventDefault()}>
                <h5>Turnos</h5>

                <div className="field">
                    <label htmlFor="name" className="w-full">
                        Semana
                    </label>
                    <InputNumber
                        value={week}
                        onChange={(e) => setWeek(e.value as number)}
                        id="week"
                        name="week"
                        className={classNames({
                            "p-invalid": errors.week,
                        })}
                        min={1}
                        max={5}
                        showButtons
                        format={false}
                    />
                    {errors.week && (
                        <small className="p-invalid text-danger">
                            {errors.week}
                        </small>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="start" className="w-full">
                        Hora de inicio
                    </label>
                    <Calendar
                        id="start"
                        value={start}
                        onChange={(e) => e.value && setStart(e.value)}
                        timeOnly
                        showIcon
                        icon="pi pi-clock"
                        hourFormat="12"
                        mask="99:99 aa"
                    />

                    {errors.start && (
                        <small className="p-invalid text-danger">
                            {errors.start}
                        </small>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="end" className="w-full">
                        Hora de salida
                    </label>
                    <div className="flex-auto">
                        <Calendar
                            id="end"
                            value={end}
                            onChange={(e) => e.value && setEnd(e.value)}
                            timeOnly
                            showIcon
                            icon="pi pi-clock"
                            hourFormat="12"
                            mask="99:99 aa"
                        />
                    </div>

                    {errors.end && (
                        <small className="p-invalid text-danger">
                            {errors.end}
                        </small>
                    )}
                </div>

                <SelectDays setDays={setDays} error={errors.days} days={days} />

                <Button
                    type="button"
                    className="mb-5"
                    onClick={onSubmit}
                    rounded
                    label="Agregar Turno"
                />

                <EditWorkSchedulerDetailTable
                    details={entity.workSchedulerDetail}
                    toast={toast}
                    setSubmitted={setSubmitted}
                />
            </form>
        </div>
    );
};

export default EditWorkSchedulerDetail;
