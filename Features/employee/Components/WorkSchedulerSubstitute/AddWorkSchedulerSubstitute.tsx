import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import { addWorkSchedulerSubstitute } from "./Services/workSchedulerSubstituteService";
import WorkSchedulerSubstituteFormSchema from "./Validation/WorkSchedulerSubstituteFormSchema";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import useWorkSchedulerQuery from "@/Features/workScheduler/Hooks/useWorkSchedulerQuery";

interface Props {
    setAddEntityDialog: (value: boolean) => void;
    addEntityDialog: boolean;
    id: number;
    handleAdd: () => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddWorkSchedulerSubstitute = ({
    setAddEntityDialog,
    addEntityDialog,
    id,
    toast,
    setSubmitted,
}: Props) => {
    const { addEntityFormSchema } = WorkSchedulerSubstituteFormSchema();

    const {
        handleSubmit,
        watch,
        register,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IWorkSchedulerSubstitute>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddEntityQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
        service: addWorkSchedulerSubstitute,
    });

    const onSubmit = (data: IWorkSchedulerSubstitute) => {
        data.idEmployee = id;
        data.idEmployeeAuthorize = id;
        data.idWorkScheduler = data.idWorkScheduler
        data.description = data.description;
        data.startDate = data.startDate;
        data.endDate = data.endDate;

        addEntity.mutate(data);
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    return (
        <Dialog
            visible={addEntityDialog}
            style={{ width: "50vw" }}
            header="Agregar Suplencia"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="idWorkScheduler">Horario</label>
                            <GenericDropDown
                                id="idWorkScheduler"
                                isValid={!!errors.idWorkScheduler}
                                setValue={setValue}
                                watch={watch}
                                text="name"
                                useQuery={useWorkSchedulerQuery}
                            />
                            {errors.idWorkScheduler && (
                                <small className="p-invalid text-red-500">
                                    {errors.idWorkScheduler.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="start">Fecha De incio</label>
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

                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="start">Fecha Final</label>
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
                        <div className="field col-12 md:col-12 lg:4">
                            <label htmlFor="description">Descripción</label>
                            <InputText
                                id="description"
                                type="text"
                                {...register("description")}
                            />
                            {errors.description && (
                                <small className="p-invalid text-red-500">
                                    {errors.description.message?.toString()}
                                </small>
                            )}
                        </div>
                    </div>
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default AddWorkSchedulerSubstitute;
