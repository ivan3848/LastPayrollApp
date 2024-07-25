import { CONCEPT_TYPE_INSURANCE } from "@/constants/conceptTypes";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericConceptDropDown from "@/Features/Shared/Components/GenericConceptDropDown";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import React from "react";
import { useForm } from "react-hook-form";
import useAddPersonInsuranceQuery from "./Hooks/useAddPersonInsuranceQuery";

interface Props {
    id: number;
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddPersonInsurance = ({
    id,
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IPersonInsurance>({});

    const addEntity = useAddPersonInsuranceQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IPersonInsurance) => {
        data.IdEmployee = id;
        data.StartDate = data!.StartDate!;
        data.EndDate = data!.EndDate!;
        data.Amount = data!.Amount!;
        data.PercentDiscount = data.PercentDiscount;

        addEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };
    return (
        <Dialog
            visible={addEntityDialog}
            header="Agregar seguro al empleado"
            modal
            style={{ width: "40vw" }}
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mt-2">
                    <label htmlFor="idBank" className="block mb-2">
                        Dependientes
                    </label>
                    <GenericConceptDropDown
                        id="idConcept"
                        isValid={!!errors.IdConcept}
                        setValue={setValue}
                        watch={watch}
                        code={CONCEPT_TYPE_INSURANCE}
                    />
                    {errors.IdConcept && (
                        <small className="p-invalid text-danger">
                            {errors.IdConcept.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="idBank" className="block mb-2">
                        Seguros
                    </label>
                    <GenericConceptDropDown
                        id="idConcept"
                        isValid={!!errors.IdConcept}
                        setValue={setValue}
                        watch={watch}
                        code={CONCEPT_TYPE_INSURANCE}
                    />
                    {errors.IdConcept && (
                        <small className="p-invalid text-danger">
                            {errors.IdConcept.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="Amount" className="w-full mt-2">
                        Monto
                    </label>
                    <GenericInputNumber
                        {...register("Amount")}
                        id="Amount"
                        isValid={!!errors.Amount}
                        setValue={setValue}
                        watch={watch}
                    />
                    {errors.Amount && (
                        <small className="text-red-600">
                            {errors.Amount.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="idStatusAccountType" className="block mb-2">
                        Descuento
                    </label>
                    <GenericInputNumber
                        {...register("PercentDiscount")}
                        id="PercentDiscount"
                        isValid={!!errors.PercentDiscount}
                        setValue={setValue}
                        watch={watch}
                    />
                    {errors.PercentDiscount && (
                        <small className="p-invalid text-danger">
                            {errors.PercentDiscount.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="startDate" className="block mb-2 mt-2">
                        Fecha de Inicio
                    </label>
                    <Calendar
                        id="StartDate"
                        {...register("StartDate")}
                        showIcon
                        onSelect={() =>
                            setValue("StartDate", watch("StartDate"))
                        }
                    />
                    {errors.StartDate && (
                        <small className="text-red-600">
                            {errors.StartDate.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="EndDate" className="block mb-2 mt-2">
                        Fecha final
                    </label>
                    <Calendar id="endDate" {...register("EndDate")} showIcon />
                    {errors.EndDate && (
                        <small className="text-red-600">
                            {errors.EndDate.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="mt-2">
                    <DialogFooterButtons hideDialog={hideDialog} />
                </div>
            </form>
        </Dialog>
    );
};

export default AddPersonInsurance;
