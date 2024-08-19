import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import GenericConceptDropDown from "@/Features/Shared/Components/GenericConceptDropDown";
import useEditLicense from "./Hooks/useEditLicense";
import { CONCEPT_TYPE_LICENSE } from "@/constants/conceptTypes";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import LicensesFormSchema from "./Validation/LicensesFormSchema";

interface Props {
    entity: ILicenses;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditLicense = ({
    entity,
    setEditEntityDialog,
    setSubmitted,
    toast,
    editEntityDialog,
}: Props) => {
    const { editEntityFormSchema } = LicensesFormSchema();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ILicenses>({
        resolver: zodResolver(editEntityFormSchema),
        defaultValues: entity,
    });

    const editEntity = useEditLicense({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    useEffect(() => {
        if (entity) {
            Object.keys(entity).forEach((key) => {
                if (key === "start" || key === "end") {
                    setValue(
                        key as keyof ILicenses,
                        new Date(entity[key as keyof ILicenses] as Date)
                    );
                    return;
                }
                setValue(
                    key as keyof ILicenses,
                    entity[key as keyof ILicenses]
                );
            });
        }
    }, [entity, setEditEntityDialog]);

    const onSubmit = (data: ILicenses) => {
        data.idLicences = entity.idLicences;
        data.idEmployee = entity.idEmployee;
        data.idConcept = data.idConcept;
        data.doctorName = data.doctorName;
        data.doctorexequatur = data.doctorexequatur;
        data.description = data.description;
        data.start = data.start;
        data.end = data.end;
        data.isToPay = data.isToPay;

        editEntity.mutate(data);
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    let isToPay: string[] = ["Si", "No"];

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "50vw" }}
            header="Editar Licencia"
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
                                id="idConcept"
                                isValid={!!errors.idConcept}
                                idValueEdit={entity.idConcept!}
                                setValue={setValue}
                                watch={watch}
                                code={CONCEPT_TYPE_LICENSE}
                            />
                            {errors.idConcept && (
                                <small className="p-invalid text-danger">
                                    {errors.idConcept.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="doctorName">Doctor</label>
                            <InputText
                                id="doctorName"
                                type="text"
                                defaultValue={entity.doctorName}
                                {...register("doctorName")}
                            />
                            {errors.doctorName && (
                                <small className="p-invalid text-red-500">
                                    {errors.doctorName.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="doctorexequatur">Doctor Exequantur</label>
                            <InputText
                                id="doctorexequatur"
                                type="text"
                                defaultValue={entity.doctorexequatur}
                                {...register("doctorexequatur")}
                            />
                            {errors.doctorexequatur && (
                                <small className="p-invalid text-red-500">
                                    {errors.doctorexequatur.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="start">Fecha De incio</label>
                            <Calendar
                                id="start"
                                {...register("start")}
                                value={watch("start") ?? new Date(entity.start)}
                                onChange={(e) => setValue("start", new Date(e.value!))}
                                showIcon
                                key={entity.start.toString()}

                            />
                            {errors.start && (
                                <small className="p-invalid text-red-500">
                                    {errors.start.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="end">Fecha Final</label>
                            <Calendar
                                id="end"
                                {...register("end")}
                                value={watch("end") ?? new Date(entity.end)}
                                onChange={(e) => setValue("end", new Date(e.value!))}
                                showIcon
                                key={entity.end.toString()}

                            />
                            {errors.end && (
                                <small className="p-invalid text-red-500">
                                    {errors.end.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="isToPay">Para pago</label>
                            <div>
                                <SelectButton
                                    {...register("isToPay")}
                                    value={watch("isToPay") ? "Si" : "No"}
                                    onChange={(e) => {
                                        setValue("isToPay", e.value === "Si" ? true : false);
                                    }}
                                    options={isToPay}
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

export default EditLicense;
