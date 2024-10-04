import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import GenericConceptDropDown from "@/Features/Shared/Components/GenericConceptDropDown";
import { CONCEPT_TYPE_EXTRAHOUR_LATENESS } from "@/constants/conceptTypes";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import useEditExtraHourLateness from "../Hooks/useEditExtraHourLateness";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import ExtraHourLatenessFormSchema from "../Validations/ExtraHourLatenessFormSchema";

interface Props {
    entity: IExtraHourLateness;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EdiExtraHourLateness = ({
    entity,
    setEditEntityDialog,
    setSubmitted,
    toast,
    editEntityDialog,
}: Props) => {
    const { editEntityFormSchema } = ExtraHourLatenessFormSchema();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IExtraHourLateness>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useEditExtraHourLateness({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    useEffect(() => {
        if (entity) {
            Object.keys(entity).forEach((key) => {
                if (key === "date") {
                    setValue(
                        key as keyof IExtraHourLateness,
                        new Date(entity[key as keyof IExtraHourLateness] as Date)
                    );
                    return;
                }
                setValue(
                    key as keyof IExtraHourLateness,
                    entity[key as keyof IExtraHourLateness]
                );
            });
        }
    }, [entity, setEditEntityDialog]);

    const onSubmit = (data: IExtraHourLateness) => {
        data.idExtraHourLateness = entity.idExtraHourLateness;
        data.idEmployee = entity.idEmployee;
        data.idConcept = data.idConcept ?? entity.idConcept;
        data.date = data.date ?? entity.date;
        data.hourAmount = data.hourAmount ?? entity.hourAmount;
        data.description = data.description;
        data.typeValue = data.typeValue ?? entity.typeValue;

        editEntity.mutate(data);
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    let typeValue: string[] = ["Hora extra", "Tardanza"];

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "50vw" }}
            header="Editar Horas extras / Tardanzas"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="date">Fecha</label>
                            <Calendar
                                id="date"
                                value={watch("date") ?? new Date(entity?.date!)}
                                onChange={(e) => setValue("date", e.value!)}
                                showIcon
                                showButtonBar
                                key={entity?.date.toString()}
                            />
                            {errors.date && (
                                <small className="p-invalid text-red-500">
                                    {errors.date.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="idConcept">Concepto</label>
                            <GenericConceptDropDown
                                id={"idConcept"}
                                code={CONCEPT_TYPE_EXTRAHOUR_LATENESS}
                                isValid={!!errors.idConcept}
                                watch={watch}
                                setValue={setValue}
                            />
                            {errors.idConcept && (
                                <small className="p-invalid text-danger">
                                    {errors.idConcept.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="hourAmount">Cantidad de horas</label>
                            <div>
                                <GenericInputNumber
                                    id="hourAmount"
                                    isValid={!!errors.hourAmount}
                                    setValue={setValue}
                                    watch={watch}
                                    format={false}
                                />
                                {errors.hourAmount && (
                                    <small className="p-invalid text-danger">
                                        {errors.hourAmount.message?.toString()}
                                    </small>
                                )}
                            </div>
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="isToPay">Tipo</label>
                            <div>
                                <SelectButton
                                    {...register("typeValue")}
                                    value={watch("typeValue") == "extraHour" ? "Hora extra" : "Tardanza"}
                                    onChange={(e) => {
                                        setValue("typeValue", e.value === "Hora extra" ? "extraHour" : "lateness");
                                    }}
                                    options={typeValue}
                                />
                            </div>
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

export default EdiExtraHourLateness;
