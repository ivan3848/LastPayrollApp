import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import { IWorkSchedulerDetail } from "@/Features/workScheduler/Types/IWorkScheduler";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import workSchedulerDetailFormSchemas from "../Validations/WorkSchedulerDetailFormSchemas";
import { Calendar } from "primereact/calendar";
import GenericCheckBox from "@/Features/Shared/Components/GenericCheckBox";
import { Checkbox } from "primereact/checkbox";

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
                    isValid={!errors.week}
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
                {/* <Calendar
                    value={watch("start")}
                    onChange={(e) => setValue("start", e.value)}
                    hourFormat="12"
                    timeOnly
                /> */}
                <label htmlFor="end" className="w-full">
                    Hora de salida
                </label>
                {/* <Calendar
                    value={watch("end")}
                    onChange={(e) => setValue("start", e.value)}
                    hourFormat="12"
                    timeOnly
                /> */}
            </div>

            <div className="grid">
                <div className="col-12 md:col-4">
                    <div className="field-checkbox">
                        <GenericCheckBox
                            id="isSpecial"
                            text="Especial"
                            watch={watch}
                            setValue={setValue}
                        />
{/* 
                        <div className="field-checkbox">
                            <Checkbox
                                inputId={1}
                                name={id}
                                value={id}
                                checked={watch(id)}
                                onChange={(e) => setValue(id, e.checked!)}
                            />
                            <label htmlFor={id}>{text}</label>
                        </div> */}
                    </div>
                </div>

                <div className="col-12 md:col-4">
                    <div className="field-checkbox">
                        <GenericCheckBox
                            id="isBonification"
                            text="Bonificación"
                            watch={watch}
                            setValue={setValue}
                        />
                    </div>
                </div>

                <div className="col-12 md:col-4">
                    <div className="field-checkbox">
                        <GenericCheckBox
                            id="isCommission"
                            text="Comisión"
                            watch={watch}
                            setValue={setValue}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddWorkSchedulerDetail;
