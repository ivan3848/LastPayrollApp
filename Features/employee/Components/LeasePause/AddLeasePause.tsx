import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import { useConceptByStatusCodeQuery } from "@/Features/concept/Hooks/useConceptQuery";
import { CONCEPT_TYPE_LEASE } from "@/constants/conceptTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import { addLeasePauseService } from "./Services/LeasePauseService";
import LeasePauseFormSchema from "./Validation/LeasePauseFormSchema";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect } from "react";

interface Props {
    setAddEntityDialog: (value: boolean) => void;
    addEntityDialog: boolean;
    id: number;
    handleAdd: () => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
    entity: ILeasePause;
}

const AddLeasePause = ({
    setAddEntityDialog,
    addEntityDialog,
    id,
    toast,
    entity,
    setSubmitted,
}: Props) => {
    const { addEntityFormSchema } = LeasePauseFormSchema();
    const { data: values } = useConceptByStatusCodeQuery(
        CONCEPT_TYPE_LEASE,
        []
    );

    const {
        handleSubmit,
        watch,
        register,
        reset,
        setValue,
        formState: { errors },
    } = useForm<ILeasePause>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddEntityQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
        service: addLeasePauseService,
    });
    const onSubmit = (data: ILeasePause) => {
        data.isPauseActive = true;
        addEntity.mutate(data);
    };
    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    useEffect(() => {
        if (entity) {
            Object.keys(entity).forEach((key) => {
                if (key === "startPauseDate" || key === "endPauseDate") {
                    setValue(
                        key as keyof ILeasePause,
                        new Date(entity[key as keyof ILeasePause] as Date)
                    );
                    return;
                }
                setValue(
                    key as keyof ILeasePause,
                    entity[key as keyof ILeasePause]
                );
            });
        }
    }, [entity, setAddEntityDialog]);

    return (
        <Dialog
            visible={addEntityDialog}
            style={{ width: "90vw" }}
            header="Agregar suspension"
            modal
            maximizable
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="startDate">Desde</label>
                            <Calendar
                                id="startPauseDate"
                                {...register("startPauseDate")}
                                value={
                                    watch("startPauseDate") ??
                                    new Date(entity.startPauseDate!)
                                }
                                onChange={(e) =>
                                    setValue(
                                        "startPauseDate",
                                        new Date(e.value!)
                                    )
                                }
                                showIcon
                                key={entity.startPauseDate?.toString()}
                            />
                            {errors.startPauseDate && (
                                <small className="p-invalid text-red-500">
                                    {errors.startPauseDate.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="field col-12 md:col-6">
                            <label htmlFor="endPauseDate">Hasta</label>
                            <Calendar
                                id="endPauseDate"
                                {...register("endPauseDate")}
                                value={
                                    watch("endPauseDate") ??
                                    new Date(entity.endPauseDate!)
                                }
                                onChange={(e) =>
                                    setValue("endPauseDate", new Date(e.value!))
                                }
                                showIcon
                                key={entity.endPauseDate?.toString()}
                            />
                            {errors.endPauseDate && (
                                <small className="p-invalid text-red-500">
                                    {errors.endPauseDate.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="field col-12 md:col-6">
                            <label htmlFor="description">Descripción</label>
                            <InputTextarea
                                {...register("description")}
                                id="description"
                                value={
                                    watch("description") ?? entity.description
                                }
                                className="p-inputtext p-component"
                                placeholder="Ingrese una descripción"
                                rows={5}
                                cols={30}
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

export default AddLeasePause;
