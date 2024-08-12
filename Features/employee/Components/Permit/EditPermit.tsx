import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import GenericConceptDropDown from "@/Features/Shared/Components/GenericConceptDropDown";
import { IConcept } from "@/Features/concept/Types/IConcept";
import { SelectButton } from "primereact/selectbutton";
import PermitFormSchema from "./Validation/PermitFormSchema";
import useEditPermit from "./Hooks/useEditPermit";
import { CONCEPT_TYPE_PERMIT } from "@/constants/conceptTypes";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";

interface Props {
    entity: IPermit;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditPermit = ({
    entity,
    setEditEntityDialog,
    setSubmitted,
    toast,
    editEntityDialog,
}: Props) => {
    const { editEntityFormSchema } = PermitFormSchema();
    const [conceptField, setConceptField] = React.useState<IConcept>();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IPermit>({
        resolver: zodResolver(editEntityFormSchema),
        defaultValues: entity,
    });

    const editEntity = useEditPermit({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    useEffect(() => {
        if (entity) {
            Object.keys(entity).forEach((key) => {
                if (key === "startDateTime" || key === "endDateTime") {
                    setValue(
                        key as keyof IPermit,
                        new Date(entity[key as keyof IPermit] as Date)
                    );
                    return;
                }
                setValue(
                    key as keyof IPermit,
                    entity[key as keyof IPermit]
                );
            });
        }
    }, [entity, setEditEntityDialog]);

    const onSubmit = (data: IPermit) => {
        data.idEmployee = entity.idEmployee;
        data.idConcept = data.idConcept;
        data.idEmployeeAuthorize = entity.idEmployeeAuthorize;
        data.idEmployeeRegister = entity.idEmployeeRegister;
        data.hourAmount = data.hourAmount;
        data.amount = data.amount;
        data.startDateTime = data.startDateTime;
        data.endDateTime = data.endDateTime;
        data.isPaid = data.isPaid ?? false;
        data.isToPay = data.isToPay ?? false;

        editEntity.mutate(data);
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    let isToPay: string[] = ["Si", "No"];
    let isPaid: string[] = ["Si", "No"];

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "50vw" }}
            header="Editar Permisos"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="idConcept">Concepto</label>
                            <GenericConceptDropDown
                                id={"idConcept"}
                                idValueEdit={entity.idConcept}
                                code={CONCEPT_TYPE_PERMIT}
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
                            <label htmlFor="startDateTime">Fecha De incio</label>
                            <Calendar
                                id="startDateTime"
                                {...register("startDateTime")}
                                value={watch("startDateTime") ?? new Date(entity.startDateTime)}
                                onChange={(e) => setValue("startDateTime", new Date(e.value!))}
                                key={entity.startDateTime.toString()}
                                showIcon
                                showTime
                                hourFormat="12"
                            />
                            {errors.startDateTime && (
                                <small className="p-invalid text-red-500">
                                    {errors.startDateTime.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="endDateTime">Fecha Final</label>
                            <Calendar
                                id="endDateTime"
                                {...register("endDateTime")}
                                value={watch("endDateTime") ?? new Date(entity.endDateTime)}
                                onChange={(e) => setValue("endDateTime", new Date(e.value!))}
                                key={entity.endDateTime.toString()}
                                showIcon
                                showTime
                                hourFormat="12"
                            />
                            {errors.endDateTime && (
                                <small className="p-invalid text-red-500">
                                    {errors.endDateTime.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="percentDiscount" className="block mb-2">
                                Cantidad de horas
                            </label>
                            <GenericInputNumber
                                id="hourAmount"
                                isValid={!!errors.hourAmount}
                                setValue={setValue}
                                watch={watch}
                                isReadOnly={true}
                                prefix="Horas: "
                                currentValue={
                                    (new Date(watch("endDateTime")).getTime() -
                                        new Date(watch("startDateTime")).getTime()) /
                                    (1000 * 60 * 60)
                                }
                            />
                            {errors.hourAmount && (
                                <small className="text-red-600">
                                    {errors.hourAmount.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="amount" className="block mb-2">
                                Monto
                            </label>
                            <GenericInputNumber
                                id="amount"
                                isValid={!!errors.amount}
                                setValue={setValue}
                                watch={watch}
                            />
                            {errors.amount && (
                                <small className="text-red-600">
                                    {errors.amount.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="isPaid">Pago</label>
                            <div>
                                <SelectButton
                                    {...register("isPaid")}
                                    value={watch("isPaid") ? "Si" : "No"}
                                    onChange={(e) => {
                                        setValue("isPaid", e.value === "Si" ? true : false);
                                    }}
                                    options={isPaid}
                                />
                            </div>
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="isToPay">Para pago</label>
                            <div>
                                <SelectButton
                                    {...register("isToPay")}
                                    value={(watch("isToPay") ? "Si" : "No")}
                                    onChange={(e) => {
                                        setValue("isToPay", e.value === "Si" ? true : false);
                                    }}
                                    options={isToPay}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditPermit;