import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import { IWorkSchedulerDetail } from "@/Features/workScheduler/Types/IWorkScheduler";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import workSchedulerDetailFormSchemas from "../Validations/WorkSchedulerDetailFormSchemas";
import { Calendar } from "primereact/calendar";
import GenericCheckBox from "@/Features/Shared/Components/GenericCheckBox";
import { Checkbox } from "primereact/checkbox";
import {
    addHours,
    createDateFromTime,
} from "@/Features/Shared/Helpers/DateHelper";
import { useState } from "react";
import { Nullable } from "primereact/ts-helpers";
import SelectDays from "./SelectDays";

interface Props {}

const AddWorkSchedulerDetail = ({}: Props) => {
    const { addEntityFormSchema } = workSchedulerDetailFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IWorkSchedulerDetail>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const onSubmit = (data: IWorkSchedulerDetail) => {
        console.log(data);
        return;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h5>Turnos</h5>
            <div className="field">
                <label htmlFor="name" className="w-full">
                    Semana
                </label>
                <GenericInputNumber
                    id="week"
                    isValid={!!errors.week}
                    minValue={1}
                    maxValue={5}
                    setValue={setValue}
                    watch={watch}
                />
                {errors.week && (
                    <small className="p-invalid text-danger">
                        {errors.week.message?.toString()}
                    </small>
                )}
            </div>

            <div className="field">
                <label htmlFor="start" className="w-full">
                    Hora de inicio
                </label>
                <Calendar
                    id="start"
                    value={addHours(watch("start") ?? new Date(), 4)}
                    onChange={(e) =>
                        e.value &&
                        setValue(
                            "start",
                            createDateFromTime(e.value?.toLocaleTimeString()!)
                        )
                    }
                    timeOnly
                    showIcon
                    hourFormat="12"
                    mask="99:99 aa"
                />
                <label htmlFor="end" className="w-full">
                    Hora de salida
                </label>
                <Calendar
                    id="end"
                    value={addHours(watch("end") ?? new Date(), 4)}
                    onChange={(e) =>
                        e.value &&
                        setValue(
                            "end",
                            createDateFromTime(e.value?.toLocaleTimeString()!)
                        )
                    }
                    timeOnly
                    showIcon
                    hourFormat="12"
                    mask="99:99 aa"
                />
            </div>

            {/* <SelectDays /> */}
        </form>
    );
};

export default AddWorkSchedulerDetail;
